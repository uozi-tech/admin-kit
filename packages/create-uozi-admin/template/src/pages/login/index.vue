<script setup lang="ts">
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { LanguageSelect, ThemeSwitch } from '@uozi-admin/layout-antdv'
import { Form } from 'ant-design-vue'
import gettext from '~/language/gettext'
import { useSettingsStore } from '~/store'

const thisYear = new Date().getFullYear()

const loading = ref(false)

const modelRef = reactive({
  email: '',
  password: '',
})

const rulesRef = reactive({
  email: [
    {
      required: true,
      message: () => $gettext('Please input your email!'),
    },
  ],
  password: [
    {
      required: true,
      message: () => $gettext('Please input your password!'),
    },
  ],
})

const { validate, validateInfos, clearValidate } = Form.useForm(modelRef, rulesRef)

function onSubmit() {
  validate().then(async () => {
    loading.value = true

    // login

    loading.value = false
  })
}

watch(() => gettext.current, () => {
  clearValidate()
})

const settings = useSettingsStore()
</script>

<template>
  <ALayout>
    <ALayoutContent>
      <div class="login-container">
        <div class="login-form">
          <div class="project-title">
            <h1>{{ settings.siteTitle }}</h1>
          </div>
          <AForm id="components-form-demo-normal-login">
            <AFormItem v-bind="validateInfos.email">
              <AInput
                v-model:value="modelRef.email"
                :placeholder="$gettext('Email')"
              >
                <template #prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </AInput>
            </AFormItem>
            <AFormItem v-bind="validateInfos.password">
              <AInputPassword
                v-model:value="modelRef.password"
                :placeholder="$gettext('Password')"
              >
                <template #prefix>
                  <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </AInputPassword>
            </AFormItem>
            <AFormItem>
              <AButton
                type="primary"
                block
                html-type="submit"
                :loading
                @click="onSubmit"
              >
                {{ $gettext('Login') }}
              </AButton>
            </AFormItem>
          </AForm>
          <div class="footer">
            <p>Copyright © 2023 - {{ thisYear }} {{ settings.copyright }}</p>
            <AFlex
              justify="center"
              align="center"
              gap="8"
            >
              <LanguageSelect
                class="inline"
                :current-language="settings.language"
                :languages="gettext.available"
                @change-language="(l) => settings.setLanguage(l)"
              />
            </AFlex>
            <div class="flex justify-center mt-4">
              <ThemeSwitch
                :current-theme="settings.theme"
                @toggle-theme="t => settings.setTheme(t)"
              />
            </div>
          </div>
        </div>
      </div>
    </ALayoutContent>
  </ALayout>
</template>

<style lang="less" scoped>
.ant-layout-content {
  background: #fff;
}

.dark .ant-layout-content {
  background: transparent;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .login-form {
    max-width: 400px;
    width: 80%;

    .project-title {
      margin: 50px;

      h1 {
        font-size: 50px;
        font-weight: 100;
        text-align: center;
      }
    }

    .anticon {
      color: #a8a5a5 !important;
    }

    .footer {
      padding: 30px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
