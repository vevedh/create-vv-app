import type { FormKitEvent, FormKitNode } from '@formkit/core'

export function useValidationMessages(node: FormKitNode) {
  const messages = ref<string[]>([])
  const hasError = ref<boolean>(false)

  const getMessages = computed(() => {
    return messages.value.join('\n')
  })

  const msgAddedListener = node.on('message-added', observeMessagesEvent)
  const msgRemovedListener = node.on('message-removed', observeMessagesEvent)
  const msgUpdatedListener = node.on('message-updated', observeMessagesEvent)

  onUnmounted(() => {
    node.off(msgAddedListener)
    node.off(msgRemovedListener)
    node.off(msgUpdatedListener)
  })

  function observeMessagesEvent(event: FormKitEvent) {
    const { name } = event
    const { type, value } = event.payload

    if (name === 'message-added') {
      if (type === 'validation') {
        messages.value.push(value)
      }
    }
    if (name === 'message-removed') {
      if (type === 'validation') {
        const msgIdx = messages.value.findIndex(m => m === value)
        messages.value.splice(msgIdx, 1)
        node.clearErrors(true)
        checkForErrorMessages()
      }
    }
    if (name === 'message-updated') {
      if (type === 'validation') {
        const msgIdx = messages.value.findIndex(m => m === value)
        if (msgIdx === -1) {
          messages.value.push(value)
        }
      }
    }
  }

  function checkForErrorMessages() {
    if (getMessages.value) {
      hasError.value = true
      return
    }

    hasError.value = false
  }

  return {
    getMessages,
    hasError,
    checkForErrorMessages,
  }
}
