"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const pluginConfig = ctx => {
    let userConfig = ctx.getConfig('picgo-plugin-cloudflare-deploy-hook');
    if (!userConfig) {
        userConfig = {};
    }
    return [
        {
            name: 'requestUrl',
            type: 'input',
            alias: '请求 URL',
            message: '请输入网络请求的 URL（例如：https://api.cloudflare.com/...）',
            required: false
        },
        {
            name: 'requestMethod',
            type: 'input',
            alias: '请求方法',
            message: '请输入请求方法（例如：GET, POST）',
            default: 'POST',
            required: false
        },
        {
            name: 'requestHeaders',
            type: 'input',
            alias: '请求头部',
            message: '请输入请求头部（例如：{"Authorization": "Bearer YOUR_API_TOKEN"}）',
            required: false
        },
        {
            name: 'requestBody',
            type: 'input',
            alias: '请求体',
            message: '请输入请求体（如果有的话）',
            required: false
        }
    ];
};
module.exports = (ctx) => {
    const register = () => {
        ctx.helper.afterUploadPlugins.register('cloudflare-deploy-hook', {
            handle: async function (ctx) {
                const requestUrl = ctx.getConfig('picgo-plugin-cloudflare-deploy-hook.requestUrl') || '';
                const requestMethod = ctx.getConfig('picgo-plugin-cloudflare-deploy-hook.requestMethod') || 'POST';
                // 设置类型
                const requestHeaders = ctx.getConfig('picgo-plugin-cloudflare-deploy-hook.requestHeaders') || '{}';
                const requestBody = ctx.getConfig('picgo-plugin-cloudflare-deploy-hook.requestBody') || '';
                const script = ''; // 确保定义了脚本变量
                if (requestUrl) { // 如果有配置 URL，执行网络请求
                    try {
                        console.log('正在执行上传后脚本：', script);
                        // 发起网络请求
                        const sendRequest = async () => {
                            try {
                                // 解析请求头部，并处理无效 JSON 字符串
                                let headers = {};
                                try {
                                    headers = JSON.parse(requestHeaders); // 如果解析失败，headers 依然是空对象
                                }
                                catch (e) {
                                    console.error('请求头部解析失败:', e);
                                }
                                // 解析请求体，处理无效 JSON 字符串
                                let body = null;
                                if (requestBody) {
                                    try {
                                        body = JSON.parse(requestBody);
                                    }
                                    catch (e) {
                                        console.error('请求体解析失败:', e);
                                    }
                                }
                                // 发送网络请求
                                const response = await (0, axios_1.default)({
                                    method: requestMethod,
                                    url: requestUrl,
                                    headers: headers,
                                    data: body
                                });
                                return { success: true, message: '请求成功', data: response.data };
                            }
                            catch (error) {
                                return { success: false, message: error.message };
                            }
                        };
                        // 将用户脚本与网络请求代码合并
                        const combinedScript = `
              ${sendRequest}
              ${script}
              sendRequest().then(result => result);  // 调用 sendRequest 函数并返回结果
            `;
                        // 确保 script 是 string 类型并执行
                        const result = await eval(combinedScript); // 执行合并后的脚本
                        // 判断执行结果，并根据结果显示不同的弹窗
                        if (result && result.success) {
                            ctx.emit('notification', {
                                title: '✅ 成功',
                                body: result.message || '上传后脚本执行成功'
                            });
                        }
                        else {
                            ctx.emit('notification', {
                                title: '❌ 错误',
                                body: (result === null || result === void 0 ? void 0 : result.message) || '上传后脚本执行失败'
                            });
                        }
                    }
                    catch (error) {
                        ctx.emit('notification', {
                            title: '❌ 错误',
                            body: `执行脚本时发生错误: ${error.message}`
                        });
                        throw new Error(`执行脚本时发生错误: ${error.message}`);
                    }
                }
            },
            config: pluginConfig
        });
    };
    return {
        register,
        config: pluginConfig
    };
};
