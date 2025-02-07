picgo-plugin-cloudflare-deploy-hook
插件用于文件上传成功后的js执行，用于cloudflare-deploy-hook功能，具体可查看：https://developers.cloudflare.com/pages/configuration/deploy-hooks/

ClI only

import { PicGo } from 'picgo'

const pluginConfig = ctx => { let userConfig = ctx.getConfig('picgo-plugin-cloudflare-deploy-hook') if (!userConfig) { userConfig = {} } return [ { name: 'afterUploadScript', type: 'input', alias: '上传后执行的脚本', default: userConfig.afterUploadScript || '', message: '请输入您想在上传成功后执行的 JavaScript 代码（例如：console.log("上传成功")）', required: false } ] }

export = (ctx: PicGo) => { const register = () => { ctx.helper.afterUploadPlugins.register('cloudflare-deploy-hook', { handle: async function (ctx) { const script = ctx.getConfig('picgo-plugin-cloudflare-deploy-hook.afterUploadScript') || ''

    if (script) {
      try {
        // 执行用户提供的脚本
        console.log('正在执行上传后脚本：', script)

        // 确保 script 是 string 类型
        const result = eval(script as string)  // 强制转换为 string 类型

        // 判断执行结果，并根据结果显示不同的弹窗
        if (result && result.success) {
          ctx.emit('notification', {
            title: '✅ 成功',
            body: result.message || '上传后脚本执行成功'
          })
        } else {
          ctx.emit('notification', {
            title: '❌ 错误',
            body: result?.message || '上传后脚本执行失败'
          })
        }
      } catch (error) {
        ctx.emit('notification', {
          title: '❌ 错误',
          body: `执行脚本时发生错误: ${error.message}`
        })
        throw new Error(`执行脚本时发生错误: ${error.message}`)
      }
    }
  },
  config: pluginConfig
})
}

return { register, config: pluginConfig } }