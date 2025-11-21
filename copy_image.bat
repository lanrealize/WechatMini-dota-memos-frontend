@echo off
chcp 65001 >nul
echo ====================================
echo    复制测试图片到项目
echo ====================================
echo.

set SOURCE="D:\Developments\dota memos\01 Material\pictures\00.jpg"
set DEST="miniprogram\assets\images\void_01.jpg"

if exist %SOURCE% (
    echo [1/2] 找到源图片：%SOURCE%
    copy /Y %SOURCE% %DEST% >nul
    if exist %DEST% (
        echo [2/2] ✓ 图片复制成功！
        echo.
        echo 目标位置：%DEST%
        echo.
        echo ====================================
        echo    现在可以打开微信开发者工具了！
        echo ====================================
    ) else (
        echo [2/2] ✗ 复制失败！
        echo 请检查目标目录是否存在。
    )
) else (
    echo ✗ 找不到源图片！
    echo.
    echo 请检查图片是否在以下位置：
    echo %SOURCE%
    echo.
    echo 如果图片在其他位置，请：
    echo 1. 手动复制到：miniprogram\assets\images\
    echo 2. 重命名为：void_01.jpg
)

echo.
pause

