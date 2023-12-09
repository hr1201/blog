# ./deploy.sh
# 忽略错误
set -e

# 构建
# pnpm run Rarrot:build

# 进入待发布的目录
# cd Rarrot/.vitepress/dist

# git init
git add -A
git commit -m '新增文章'

# 如果部署到 https://<USERNAME>.github.io
git push -f https://github.com/hr1201/hr1201.github.io.git main

cd -
