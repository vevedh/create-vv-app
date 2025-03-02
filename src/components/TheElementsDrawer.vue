<script setup lang="ts">
import type { FormKitSchemaDefinition, FormKitSchemaNode } from '@formkit/core';
import { useQuasar } from 'quasar';
import { ref, type UnwrapRef } from 'vue';

const model = defineModel<boolean>();
const { dark } = useQuasar();
const tools = ref<
  {
    name: string;
    icon: string;
    title: string;
    description: string;
    schema: FormKitSchemaDefinition;
  }[]
>([
  {
    name: 'text',
    icon: 'text_format',
    title: 'Entrée de texte',
    description: 'Texte sur une seule ligne',
    schema: {
      $formkit: 'q-input',
      name: 'text',
      label: 'Texte',
      inputType: 'text',
    },
  },
  {
    name: 'number',
    icon: '123',
    title: 'Entrée numérique',
    description: 'Entrez uniquement des chiffres',
    schema: {
      $formkit: 'q-input',
      name: 'number',
      label: 'Numéro',
      inputType: 'number',
      validation: 'number',
    },
  },
  {
    name: 'email',
    icon: 'alternate_email',
    title: 'Adresse e-mail',
    description: 'Entrée de texte qui attend un email',
    schema: {
      $formkit: 'q-input',
      name: 'email',
      label: 'Email',
      inputType: 'email',
      validation: 'email',
    },
  },
  {
    name: 'phone',
    icon: 'phone',
    title: 'Numéro de téléphone',
    description: 'Numéro de téléphone avec masque',
    schema: {
      $formkit: 'q-input',
      name: 'phone',
      label: 'Téléphone',
      mask: '(##) #####-####',
      'unmasked-value': true,
      inputType: 'text',
    },
  },
  {
    name: 'textarea',
    icon: 'wrap_text',
    title: 'Zone de texte',
    description: 'Ligne unique ou multilignes',
    schema: {
      $formkit: 'q-input',
      name: 'textarea',
      label: 'Zone de texte',
      inputType: 'textarea',
    },
  },
  {
    name: 'checkbox',
    icon: 'check_box',
    title: 'Case à cocher',
    description: 'Entrée de simple marquage',
    schema: {
      $formkit: 'q-checkbox',
      name: 'checkbox',
      label: 'Case à cocher',
    },
  },
  {
    name: 'select',
    icon: 'arrow_drop_down',
    title: 'Sélectionner',
    description: 'Un seul choix',
    schema: {
      $formkit: 'q-select',
      name: 'select',
      label: 'Sélectionner',
    },
  },
]);
const statics = ref<
  {
    name: string;
    icon: string;
    title: string;
    description: string;
    schema: FormKitSchemaDefinition;
  }[]
>([
  {
    name: 'button',
    icon: 'check',
    title: 'Bouton de soumission',
    description: 'Bouton qui termine le formulaire',
    schema: {
      $formkit: 'q-btn',
      name: 'submit',
      buttonLabel: 'Soumettre',
      bind: '$submitAttrs',
      ignore: true,
      type: 'submit',
      disabled: '$disabled',
    },
  },
  {
    name: 'button',
    icon: 'star',
    title: 'Bouton primaire',
    description: 'Bouton de couleur primaire',
    schema: {
      $formkit: 'q-btn',
      name: 'primaryButton',
      buttonLabel: 'Bouton',
      color: 'primary',
      ignore: true,
      type: 'submit',
      disabled: '$disabled',
    },
  },
  {
    name: 'button',
    icon: 'add',
    title: 'Bouton secondaire',
    description: 'Bouton de couleur secondaire',
    schema: {
      $formkit: 'q-btn',
      name: 'secondaryButton',
      buttonLabel: 'Bouton',
      color: 'secondary',
      ignore: true,
      type: 'submit',
      disabled: '$disabled',
    },
  },
  {
    name: 'button',
    icon: 'warning',
    title: 'Bouton risque',
    description: 'Bouton de couleur négative',
    schema: {
      $formkit: 'q-btn',
      name: 'dangerButton',
      buttonLabel: 'Bouton',
      color: 'negative',
      ignore: true,
      type: 'submit',
      disabled: '$disabled',
    },
  },
  {
    name: 'separator',
    icon: 'horizontal_rule',
    title: 'Séparateur',
    description: 'Ligne horizontale de séparation',
    schema: {
      $el: 'hr',
      name: 'separator',
      attrs: {
        class: 'q-my-sm',
        style:
          'border: none; height: 1px; color: #aaa; background-color: #aaa;',
      },
    },
  },
  {
    name: 'h1',
    icon: 'sym_o_format_h1',
    title: 'En-tête H1',
    description: 'Élément HTML <H1>',
    schema: {
      $el: 'h1',
      name: 'h1',
      children: 'Lorem ipsum dolor',
      attrs: { class: 'no-margin' },
    },
  },
  {
    name: 'h2',
    icon: 'sym_o_format_h2',
    title: 'En-tête H2',
    description: 'Élément HTML <H2>',
    schema: {
      $el: 'h2',
      name: 'h2',
      children: 'Lorem ipsum dolor',
      attrs: { class: 'no-margin' },
    },
  },
  {
    name: 'h3',
    icon: 'sym_o_format_h3',
    title: 'En-tête H3',
    description: 'Élément HTML <H3>',
    schema: {
      $el: 'h3',
      name: 'h3',
      children: 'Lorem ipsum dolor',
      attrs: { class: 'no-margin' },
    },
  },
  {
    name: 'h4',
    icon: 'sym_o_format_h4',
    title: 'En-tête H4',
    description: 'Élément HTML <H4>',
    schema: {
      $el: 'h4',
      name: 'h4',
      children: 'Lorem ipsum dolor',
      attrs: { class: 'no-margin' },
    },
  },
  {
    name: 'paragraph',
    icon: 'sym_o_format_paragraph',
    title: 'Paragraphe',
    description: 'Élément HTML <p>',
    schema: {
      $el: 'p',
      name: 'p',
      children: 'Lorem ipsum dolor',
      attrs: { class: 'no-margin' },
    },
  },
  {
    name: 'blockquote',
    icon: 'format_quote',
    title: 'Bloc de citation',
    description: 'Élément HTML <quote>',
    schema: {
      $el: 'blockquote',
      name: 'blockquote',
      children: 'Lorem ipsum dolor',
      attrs: { class: 'text-grey' },
    },
  },
]);

const tab = ref('elements');
const elementsTypes = ref('fields');

function onDragStart(ev: DragEvent, tool: UnwrapRef<FormKitSchemaDefinition>) {
  // Add this element's id to the drag payload so the drop handler will
  // know which element to add to its tree
  ev.dataTransfer?.setData('text', JSON.stringify(tool));
}
</script>

<template>
  <q-drawer
    v-model="model"
    class="no-scroll"
    show-if-above
    persistent
    side="left"
  >
    <q-tabs
      v-model="tab"
      narrow-indicator
      :class="dark.isActive ? 'bg-transparent' : 'bg-blue-grey-1'"
      align="justify"
      indicator-color="transparent"
      :active-bg-color="dark.isActive ? 'grey-9' : 'white'"
    >
      <q-tab name="elements" label="Éléments" no-caps />
      <q-tab name="tree" label="Arbre" no-caps />
    </q-tabs>
    <q-scroll-area class="fit" visible>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="elements">
          <q-tabs
            v-model="elementsTypes"
            narrow-indicator
            dense
            :class="dark.isActive ? 'bg-transparent' : 'bg-blue-grey-1'"
            align="justify"
            indicator-color="transparent"
            :active-bg-color="dark.isActive ? 'grey-9' : 'white'"
          >
            <q-tab name="fields" label="Champs" no-caps />
            <q-tab name="statics" label="Statique" no-caps />
            <q-tab name="structures" label="Structures" no-caps />
          </q-tabs>

          <q-tab-panels v-model="elementsTypes" animated>
            <q-tab-panel name="fields" class="no-padding q-mt-lg">
              <div
                v-for="tool in tools"
                :key="tool.name"
                class="tool-item"
                draggable="true"
                @dragstart="(event) => onDragStart(event, tool.schema)"
              >
                <div class="row items-start no-wrap q-mb-lg">
                  <q-avatar
                    rounded
                    size="md"
                    font-size="1.3rem"
                    :color="dark.isActive ? 'grey-9' : 'blue-grey-2'"
                    :text-color="dark.isActive ? 'grey-5' : 'blue-grey-8'"
                    :icon="tool.icon"
                  />
                  <div class="q-ml-sm">
                    <div
                      class="tool-title text-weight-semibold text-subtitle2"
                      :class="
                        dark.isActive ? 'text-grey-11' : 'text-blue-grey-10'
                      "
                    >
                      {{ tool.title }}
                    </div>
                    <div
                      class="tool-description text-caption"
                      :class="
                        dark.isActive ? 'text-grey-7 ' : 'text-blue-grey-7'
                      "
                    >
                      {{ tool.description }}
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="statics" class="no-padding q-mt-lg">
              <div
                v-for="tool in statics"
                :key="tool.name"
                class="tool-item"
                draggable="true"
                @dragstart="(event) => onDragStart(event, tool.schema)"
              >
                <div class="row items-start no-wrap q-mb-lg">
                  <q-avatar
                    rounded
                    size="md"
                    font-size="1.3rem"
                    :color="dark.isActive ? 'grey-9' : 'blue-grey-2'"
                    :text-color="dark.isActive ? 'grey-5' : 'blue-grey-8'"
                    :icon="tool.icon"
                  />
                  <div class="q-ml-sm">
                    <div
                      class="tool-title text-weight-semibold text-subtitle2"
                      :class="
                        dark.isActive ? 'text-grey-11' : 'text-blue-grey-10'
                      "
                    >
                      {{ tool.title }}
                    </div>
                    <div
                      class="tool-description text-caption"
                      :class="
                        dark.isActive ? 'text-grey-7 ' : 'text-blue-grey-7'
                      "
                    >
                      {{ tool.description }}
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-tab-panel>
      </q-tab-panels>
    </q-scroll-area>
  </q-drawer>
</template>

<style lang="scss">
.tool-item {
  cursor: grab;
}

.tool-title {
  line-height: 1rem;
}

.tool-description {
  line-height: 1rem;
}

.tool-item:active {
  cursor: grabbing;
  opacity: 0.4;
}
</style>
