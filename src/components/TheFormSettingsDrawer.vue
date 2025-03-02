<script setup lang="ts">
import { except } from '@formkit/utils';
import { useQuasar } from 'quasar';
import { isDevelopment } from 'std-env';
import { htmlTypes } from '~/constants';

const model = defineModel<boolean>();
const { dark, localStorage } = useQuasar();
const formStore = formStore();
const { changePreviewWidth, togglePreviewFullWidth } = formStore;

// Possible properties are: ["properties","submission","validation","layout"]
const formClosed = JSON.parse(localStorage.getItem('form-closed') || '[]');
const SettingsQBtnConfigComponent = resolveComponent('SettingsQBtnConfig');
const SettingsQInputConfigComponent = resolveComponent('SettingsQInputConfig');
const SettingsQSelectConfigComponent = resolveComponent(
  'SettingsQSelectConfig',
);
const SettingsQCheckboxConfigComponent = resolveComponent(
  'SettingsQCheckboxConfig',
);
const SettingsQSeparatorConfigComponent = resolveComponent(
  'SettingsQSeparatorConfig',
);
const SettingsHTMLConfigComponent = resolveComponent('SettingsHTMLConfig');
const SettingsDefaultNoConfigComponent = resolveComponent(
  'SettingsDefaultNoConfig',
);

const formNameInputRef = ref<HTMLElement | null>(null);
const useHighlight = await Highlight();

const htmlValues = computed(() => {
  const validValues = except(formStore.values, [
    'submit',
    'slots',
    'empty',
    'eq',
  ]);
  return useHighlight(validValues, dark.isActive);
});

const getComponentSettings = computed(() => {
  if (formStore.activeField?.$formkit === 'q-btn')
    return SettingsQBtnConfigComponent;
  if (formStore.activeField?.$formkit === 'q-input')
    return SettingsQInputConfigComponent;
  if (formStore.activeField?.$formkit === 'q-select')
    return SettingsQSelectConfigComponent;
  if (formStore.activeField?.$formkit === 'q-checkbox')
    return SettingsQCheckboxConfigComponent;
  if (formStore.activeField?.$el === 'hr')
    return SettingsQSeparatorConfigComponent;

  if (
    formStore.activeField?.$el &&
    htmlTypes
      .map((htmlType) => htmlType.value)
      .includes(formStore.activeField?.$el)
  )
    return SettingsHTMLConfigComponent;

  return SettingsDefaultNoConfigComponent;
});

function onClickLabelFormName() {
  formNameInputRef.value?.focus();
}
</script>

<template>
  <q-drawer
    v-model="model"
    class="no-scroll"
    show-if-above
    persistent
    side="right"
    :width="340"
  >
    <q-scroll-area class="fit" visible>
      <div
        v-if="
          formStore.formSettings.previewMode === 'editing' &&
          formStore.activeField
        "
      >
        <component :is="getComponentSettings" />
        <div
          v-if="isDevelopment"
          v-html="useHighlight(formStore.activeField, dark.isActive)"
        ></div>
      </div>
      <div
        v-else-if="
          formStore.formSettings.previewMode === 'editing' &&
          !formStore.activeField
        "
      >
        <q-list separator>
          <q-expansion-item
            :header-class="{
              'text-weight-semibold text-subtitle2': true,
              'bg-grey-9 text-grey-11': dark.isActive,
              'bg-blue-grey-1 text-blue-grey-10': !dark.isActive,
            }"
            :expand-icon-class="dark.isActive ? 'text-grey-11' : 'text-grey-10'"
            label="Propriétés"
            default-opened
          >
            <q-card>
              <q-card-section>
                <div>
                  <div class="row align-center items-center justify-between">
                    <label @click="onClickLabelFormName"> Nom </label>
                    <q-input
                      id="form-name"
                      ref="formNameInputRef"
                      v-model.trim="formStore.formSettings.formName"
                      filled
                      color="cyan-8"
                      dense
                      type="text"
                    />
                  </div>

                  <div
                    class="row align-center items-center justify-between q-mt-sm"
                  >
                    <div>
                      <label class="">Aperçu de la largeur</label>
                      <q-checkbox
                        :model-value="
                          formStore.formSettings.preview.isFullWidth
                        "
                        label="Total"
                        size="sm"
                        @update:model-value="togglePreviewFullWidth"
                      />
                    </div>
                    <q-input
                      v-if="!formStore.formSettings.preview.isFullWidth"
                      :model-value="formStore.formSettings.preview.width"
                      suffix="px"
                      filled
                      color="cyan-8"
                      dense
                      type="number"
                      style="max-width: 100px"
                      @update:model-value="changePreviewWidth"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
      <div v-else-if="formStore.formSettings.previewMode === 'previewing'">
        <q-list separator>
          <q-card flat>
            <q-card-section>
              <div>
                <span class="text-weight-semibold"> Informations </span>
              </div>
            </q-card-section>
            <q-card-section>
              <div v-html="htmlValues" />
            </q-card-section>
          </q-card>
        </q-list>
      </div>
      <slot />
    </q-scroll-area>
  </q-drawer>
</template>
