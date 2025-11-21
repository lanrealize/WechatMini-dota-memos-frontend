# PowerShell脚本 - 复制测试图片

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "   复制测试图片到项目" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

$source = "D:\Developments\dota memos\01 Material\pictures\00.jpg"
$dest = "miniprogram\assets\images\void_01.jpg"

if (Test-Path $source) {
    Write-Host "[1/2] 找到源图片：$source" -ForegroundColor Green
    
    Copy-Item -Path $source -Destination $dest -Force
    
    if (Test-Path $dest) {
        Write-Host "[2/2] ✓ 图片复制成功！" -ForegroundColor Green
        Write-Host ""
        Write-Host "目标位置：$dest" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "====================================" -ForegroundColor Cyan
        Write-Host "   现在可以打开微信开发者工具了！" -ForegroundColor Cyan
        Write-Host "====================================" -ForegroundColor Cyan
    } else {
        Write-Host "[2/2] ✗ 复制失败！" -ForegroundColor Red
        Write-Host "请检查目标目录是否存在。" -ForegroundColor Red
    }
} else {
    Write-Host "✗ 找不到源图片！" -ForegroundColor Red
    Write-Host ""
    Write-Host "请检查图片是否在以下位置：" -ForegroundColor Yellow
    Write-Host $source -ForegroundColor Yellow
    Write-Host ""
    Write-Host "如果图片在其他位置，请：" -ForegroundColor Yellow
    Write-Host "1. 手动复制到：miniprogram\assets\images\" -ForegroundColor Yellow
    Write-Host "2. 重命名为：void_01.jpg" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "按回车键退出"

