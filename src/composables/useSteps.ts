import { createMessage, type FormKitNode, getNode } from '@formkit/core'

export default function useSteps() {
  const activeStep = ref('')
  const steps = reactive({})
  const visitedSteps = ref<string[]>([]) // track visited steps

  // NEW: watch our activeStep and store visited steps
  // to know when to show errors
  watch(activeStep, (newStep, oldStep) => {
    if (oldStep && !visitedSteps.value.includes(oldStep)) {
      visitedSteps.value.push(oldStep)
    }
    // NEW: trigger showing validation on fields
    // within all visited steps
    visitedSteps.value.forEach((step) => {
      const node = getNode(step)
      node?.walk((n) => {
        n.store.set(
          createMessage({
            key: 'submitted',
            value: true,
            visible: false,
          }),
        )
      })
    })
  })

  const setStep = (delta: number) => {
    const stepNames = Object.keys(steps)
    const currentIndex = stepNames.indexOf(activeStep.value)
    activeStep.value = stepNames[currentIndex + delta]!
  }

  const stepPlugin = (node: FormKitNode) => {
    if (node.props.type == 'group') {
      // builds an object of the top-level groups
      // @ts-expect-error all step props are runtime defined
      steps[node.name] = steps[node.name] || {}

      node.on('created', () => {
        // use 'on created' to ensure context object is available
        // @ts-expect-error all step props are runtime defined
        steps[node.name].valid = toRef(node.context.state, 'valid')
      })

      // listen for changes in error count and store it
      node.on('count:errors', ({ payload: count }) => {
        // @ts-expect-error all step props are runtime defined
        steps[node.name].errorCount = count
      })

      // listen for changes in count of blocking validations messages
      node.on('count:blocking', ({ payload: count }) => {
        // @ts-expect-error all step props are runtime defined
        steps[node.name].blockingCount = count
      })

      // set the active tab to the 1st tab
      if (activeStep.value === '') {
        activeStep.value = node.name
      }

      // Stop plugin inheritance to descendant nodes
      return false
    }
  }

  // NEW: include visitedSteps in our return
  return { activeStep, visitedSteps, steps, stepPlugin, setStep }
}
