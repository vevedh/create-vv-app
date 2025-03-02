<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <FormViewer :formFields="formFields" @submit="onSubmit" />
</template>
<script setup lang="ts">
const formFields = [
  {
    $el: 'h4',
    name: 'h4',
    children: 'Lorem ipsum dolor',
    attrs: { class: 'no-margin' },
  },
  {
    $el: 'hr',
    name: 'separator',
    attrs: {
      class: 'q-my-sm',
      style: 'border: none; height: 1px; color: #aaa; background-color: #aaa;',
    },
  },
  {
    $formkit: 'q-input',
    name: 'text',
    label: 'Texte',
    inputType: 'text',
  },
  {
    $formkit: 'q-input',
    name: 'number',
    label: 'Numéro',
    inputType: 'number',
    validation: 'number',
  },
  {
    $formkit: 'q-input',
    name: 'phone',
    label: 'Téléphone',
    mask: '(##) #####-####',
    'unmasked-value': true,
    inputType: 'text',
  },
  {
    $el: 'p',
    name: 'p',
    children: 'Lorem ipsum dolor',
    attrs: { class: 'no-margin' },
  },
  {
    $formkit: 'q-select',
    name: 'select',
    label: 'Sélectionnez',
    options: [
      { label: 'Valor 1', value: '1' },
      { label: 'Valor 2', value: '2' },
    ],
  },
  { $formkit: 'q-checkbox', name: 'checkbox', label: 'Caixa de seleção' },
  {
    $formkit: 'q-btn',
    name: 'dangerButton',
    buttonLabel: 'Bouton',
    color: 'negative',
    ignore: true,
    type: 'reset',
    disabled: '$disabled',
    align: 'right',
  },
  {
    $formkit: 'q-btn',
    name: 'submit',
    buttonLabel: 'Soumettre',
    bind: '$submitAttrs',
    ignore: true,
    type: 'submit',
    disabled: '$disabled',
  },
];
function onSubmit(data: any) {
  console.log(data);
}
</script>
