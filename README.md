picgo-plugin-cloudflare-deploy-hook
插件用于文件上传成功后的js执行，用于cloudflare-deploy-hook功能，具体可查看：https://developers.cloudflare.com/pages/configuration/deploy-hooks/


注意：本工具使用前需要安装node环境



1.检查环境(注意版本需要在18.2以上才可使用pnpm)

```
C:\Users\Misin>node -v
v18.20.4

C:\Users\Misin>npm -v
10.7.0

```



2.安装pnpm（可选）

```
npm install -g pnpm

C:\Users\Misin>pnpm -v
9.9.0

```



3.安装代码包环境

```
git clone https://github.com/MisinGuo/picgo-plugin-cloudflare-deploy-hook.git

cd picgo-plugin-cloudflare-deploy-hook

pnpm install
```



4.即可使用dist目录中文件导入picgo安装以及配置，完成环境安装后可删除除dist目录中的所有文件

![image-20250207202549610](https://bin.misinguo.com/assets-bin/2025/02/07/20/typora-user-images/image-20250207202549610.png)

![image-20250207202648504](https://bin.misinguo.com/assets-bin/2025/02/07/20/typora-user-images/image-20250207202648504.png)

