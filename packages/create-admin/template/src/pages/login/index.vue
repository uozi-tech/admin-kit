<script setup lang="ts">
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Form, message } from 'ant-design-vue'
import gettext from '@/gettext'
import { useSettingsStore, useUserStore } from '@/pinia'
import auth from '@/api/auth'
import SetLanguage from '@/components/SetLanguage/SetLanguage.vue'
import SwitchAppearance from '@/components/SwitchAppearance/SwitchAppearance.vue'
import user from '@/api/user'
import Turnstile from '@/components/Turnstile/Turnstile.vue'
import design from '@/api/design'
import _ from 'lodash'
import { useDesignerStore } from '@/pinia/moudule/designer'

const thisYear = new Date().getFullYear()

const route = useRoute()
const router = useRouter()

const loading = ref(false)

const modelRef = reactive({
  email: '',
  password: '',
  turnstile_token: '',
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

const onSubmit = () => {
  validate().then(async () => {
    loading.value = true
    await auth.login(modelRef)
      // eslint-disable-next-line promise/no-nesting
      .then(async () => {
        message.success($gettext('Login successful'), 1)

        await user.current()

        const designer = useDesignerStore()

        // eslint-disable-next-line promise/no-nesting
        design.get_frontend_base_url().then(r => {
          designer.baseUrl = _.trimEnd(r.base_url, '/')
        })

        const next = (route.query?.next || '').toString() || '/'

        await router.push(next)
        // eslint-disable-next-line promise/no-nesting
      }).catch(e => {
        switch (e.code) {
          case 4031:
            message.error($gettext('Incorrect email or password'))
            break
          case 4291:
            message.error($gettext('Too many login failed attempts, please try again later'))
            break
          case 4033:
            message.error($gettext('User is banned'))
            break
          default:
            message.error($gettext(e.message ?? 'Server error'))
            break
        }
      })
    loading.value = false
  })
}

const userStore = useUserStore()

if (userStore.token) {
  const next = (route.query?.next || '').toString() || '/dashboard'

  router.push(next)
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
            <Turnstile v-model="modelRef">
              <template #default="{status}">
                <AFormItem>
                  <AButton
                    type="primary"
                    block
                    html-type="submit"
                    :loading="loading"
                    :disabled="!status"
                    @click="onSubmit"
                  >
                    {{ $gettext('Login') }}
                  </AButton>
                </AFormItem>
              </template>
            </Turnstile>
          </AForm>
          <div class="footer">
            <p>Copyright © 2023 - {{ thisYear }} {{ settings.copyright }}</p>
            Language
            <SetLanguage class="inline" />
            <div class="flex justify-center mt-4">
              <SwitchAppearance />
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
