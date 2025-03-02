<script setup lang="ts">
const { dark, localStorage } = useQuasar();
//const formStore = useFormStore();
//const formHistoryStore = useFormHistoryStore();

const isElementsDrawerOpened = ref(false);
const isFormSettingsDrawerOpened = ref(false);

// Global state
const offsetPage = useState<number>('offset', () => 168);

function toggleLeftDrawer() {
  isElementsDrawerOpened.value = !isElementsDrawerOpened.value;
}

function toggleRightDrawer() {
  isFormSettingsDrawerOpened.value = !isFormSettingsDrawerOpened.value;
}

/*
function fnTweak(offset: number) {
  offsetPage.value = offset;
  return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' };
}

function toggleThemeFn(newState: boolean) {
  const localTheme = newState ? 'dark' : 'light';
  dark.set(newState);
  localStorage.set('theme', localTheme);
}

function handleGoBack() {
  const lastHistory = formHistoryStore.goBack();
  if (lastHistory) {
    formStore.setFormFields(JSON.parse(lastHistory));
  }
}

function handleGoForward() {
  const forwardHistory = formHistoryStore.goForward();
  if (forwardHistory) {
    formStore.setFormFields(JSON.parse(forwardHistory));
  }
}
*/

function useState<T>(arg0: string, arg1: () => number) {
  throw new Error('Function not implemented.');
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      bordered
      class="text-white"
      height-hint="98"
      :class="dark.isActive ? 'bg-grey-10' : 'bg-white'"
    >
      <q-toolbar>
        <q-toolbar-title
          :class="dark.isActive ? 'text-grey-11' : 'text-blue-grey-10'"
        >
          Construtor de Formulários
        </q-toolbar-title>
        <ClientOnly>
          <q-toggle
            :model-value="dark.isActive"
            checked-icon="dark_mode"
            unchecked-icon="light_mode"
            size="3rem"
            color="primary"
            keep-color
          /><!--@update:model-value="toggleThemeFn"-->
        </ClientOnly>
      </q-toolbar>
    </q-header>

    <TheElementsDrawer v-model="isElementsDrawerOpened" />

    <TheFormSettingsDrawer v-model="isFormSettingsDrawerOpened" />

    <q-page-container>
      <q-page
        ><!--:style-fn="fnTweak"-->
        <slot />
        <q-page-sticky position="top-left" :offset="[12, 12]">
          <!-- v-model="formStore.formSettings.previewMode"-->
          <q-tabs
            vertical
            dense
            shrink
            class="rounded-borders"
            :class="
              dark.isActive
                ? 'bg-dark text-white'
                : 'bg-white text-blue-grey-10'
            "
            indicator-color="transparent"
            active-bg-color="secondary"
            active-color="blue-grey-1"
            style="max-height: 4.5rem"
          >
            <q-tab name="editing">
              <template #default>
                <q-icon name="edit" size="xs">
                  <q-tooltip
                    class="bg-grey-10"
                    anchor="center right"
                    self="center left"
                    :offset="[12, 12]"
                  >
                    Editar
                  </q-tooltip>
                </q-icon>
              </template>
            </q-tab>
            <q-tab name="previewing">
              <template #default>
                <q-icon name="visibility" size="xs">
                  <q-tooltip
                    class="bg-grey-10"
                    anchor="center right"
                    self="center left"
                    :offset="[12, 12]"
                  >
                    Pré-visualizar
                  </q-tooltip>
                </q-icon>
              </template>
            </q-tab>
          </q-tabs>
        </q-page-sticky>

        <q-page-sticky position="top-right" :offset="[12, 12]">
          <q-tabs
            vertical
            dense
            shrink
            class="rounded-borders"
            :class="
              dark.isActive
                ? 'bg-dark text-grey-11'
                : 'bg-white text-blue-grey-10'
            "
            indicator-color="transparent"
            style="max-height: 4.5rem"
          >
            <q-tab name="undo"
              ><!--:disable="formHistoryStore.isBackDisabled()"
              @click="handleGoBack"-->
              <template #default>
                <q-icon name="undo" size="xs">
                  <q-tooltip
                    class="bg-grey-10"
                    anchor="center left"
                    self="center right"
                    :offset="[12, 12]"
                  >
                    Retroceder
                  </q-tooltip>
                </q-icon>
              </template>
            </q-tab>
            <q-tab name="redo"
              ><!--:disable="formHistoryStore.isForwardDisabled()"
              @click="handleGoForward"-->
              <template #default>
                <q-icon name="redo" size="xs">
                  <q-tooltip
                    class="bg-grey-10"
                    anchor="center left"
                    self="center right"
                    :offset="[12, 12]"
                  >
                    Avançar
                  </q-tooltip>
                </q-icon>
              </template>
            </q-tab>
          </q-tabs>
        </q-page-sticky>

        <q-page-sticky position="bottom-left" :offset="[12, 12]">
          <q-tabs
            vertical
            dense
            shrink
            class="rounded-borders q-mb-sm"
            :class="
              dark.isActive
                ? 'bg-dark text-grey-11'
                : 'bg-white text-blue-grey-10'
            "
            indicator-color="transparent"
            style="max-height: 4.5rem"
          >
            <q-tab name="close-left-panel" @click="toggleLeftDrawer">
              <template #default>
                <q-icon
                  :name="
                    isElementsDrawerOpened ? 'arrow_back' : 'arrow_forward'
                  "
                  size="xs"
                >
                  <q-tooltip
                    class="bg-grey-10"
                    anchor="center right"
                    self="center left"
                    :offset="[12, 12]"
                  >
                    {{
                      isElementsDrawerOpened
                        ? 'Fechar painel lateral'
                        : 'Abrir painel lateral'
                    }}
                  </q-tooltip>
                </q-icon>
              </template>
            </q-tab>
          </q-tabs>
          <q-tabs
            vertical
            dense
            shrink
            class="rounded-borders"
            :class="
              dark.isActive
                ? 'bg-dark text-grey-11'
                : 'bg-white text-blue-grey-10'
            "
            indicator-color="transparent"
            style="max-height: 4.5rem"
          >
            <q-tab name="empty-form-fields">
              <template #default>
                <q-icon name="o_delete_forever" size="xs"
                  ><!--@click="formStore.setFormFields([])"-->
                  <q-tooltip
                    class="bg-grey-10"
                    anchor="center right"
                    self="center left"
                    :offset="[12, 12]"
                  >
                    Limpar formulário
                  </q-tooltip>
                </q-icon>
              </template>
            </q-tab>
          </q-tabs>
        </q-page-sticky>

        <q-page-sticky position="bottom-right" :offset="[12, 12]">
          <q-tabs
            vertical
            dense
            shrink
            class="rounded-borders q-mb-sm"
            :class="
              dark.isActive
                ? 'bg-dark text-grey-11'
                : 'bg-white text-blue-grey-10'
            "
            indicator-color="transparent"
            style="max-height: 4.5rem"
          >
            <q-tab name="close-right-panel" @click="toggleRightDrawer">
              <template #default>
                <q-icon
                  :name="
                    isFormSettingsDrawerOpened ? 'arrow_forward' : 'arrow_back'
                  "
                  size="xs"
                >
                  <q-tooltip
                    class="bg-grey-10"
                    anchor="center left"
                    self="center right"
                    :offset="[12, 12]"
                  >
                    {{
                      isFormSettingsDrawerOpened
                        ? 'Fechar painel lateral'
                        : 'Abrir painel lateral'
                    }}
                  </q-tooltip>
                </q-icon>
              </template>
            </q-tab>
          </q-tabs>
          <q-tabs
            vertical
            dense
            shrink
            class="rounded-borders"
            :class="
              dark.isActive
                ? 'bg-dark text-grey-11'
                : 'bg-white text-blue-grey-10'
            "
            indicator-color="transparent"
            style="max-height: 4.5rem"
          >
            <q-tab name="is-safe">
              <template #default>
                <q-icon name="gpp_good" size="xs"> </q-icon>
              </template>
            </q-tab>
          </q-tabs>
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
