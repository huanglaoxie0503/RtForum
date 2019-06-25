UEditorUploadSettings = {
    # 上传图片配置项
    "imageActionName": "uploadimage",  # 执行上传图片的action名称
    "imageMaxSize": 10485760,  # 上传大小限制，单位B,10M
    "imageFieldName": "upfile",  # * 提交的图片表单名称 */
    "imageUrlPrefix": "http://127.0.0.1:8000/media/",
    "imagePathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
    "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],  # 上传图片格式显示

    # 涂鸦图片上传配置项 */
    "scrawlActionName": "uploadscrawl",  # 执行上传涂鸦的action名称 */
    "scrawlFieldName": "upfile",  # 提交的图片表单名称 */
    "scrawlMaxSize": 10485760,  # 上传大小限制，单位B  10M
    "scrawlUrlPrefix": "http://127.0.0.1:8000/media/",
    "scrawlPathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",

    # 截图工具上传 */
    "snapscreenActionName": "uploadimage",  # 执行上传截图的action名称 */
    "snapscreenPathFormat": "http://127.0.0.1:8000/media/",
    "snapscreenUrlPrefix": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",

    # 抓取远程图片配置 */
    "catcherLocalDomain": ["127.0.0.1", "localhost", "img.baidu.com"],
    "catcherPathFormat": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
    "catcherActionName": "catchimage",  # 执行抓取远程图片的action名称 */
    "catcherFieldName": "source",  # 提交的图片列表表单名称 */
    "catcherMaxSize": 10485760,  # 上传大小限制，单位B */
    # 抓取图片格式显示 */
    "catcherAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
    "catcherUrlPrefix": "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}",
    # 上传视频配置 */
    "videoActionName": "uploadvideo",  # 执行上传视频的action名称 */
    "videoPathFormat": "upload/video/{yyyy}{mm}{dd}/{time}{rand:6}",
    "videoFieldName": "upfile",  # 提交的视频表单名称 */
    "videoMaxSize": 102400000,  # 上传大小限制，单位B，默认100MB */
    "videoUrlPrefix": "http://127.0.0.1:8000/media/",
    "videoAllowFiles": [
        ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
        ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid"],  # 上传视频格式显示 */

    # 上传文件配置 */
    "fileActionName": "uploadfile",  # controller里,执行上传视频的action名称 */
    "filePathFormat": "upload/file/{yyyy}{mm}{dd}/{time}{rand:6}",
    "fileFieldName": "upfile",  # 提交的文件表单名称 */
    "fileMaxSize": 204800000,  # 上传大小限制，单位B，200MB */
    "fileUrlPrefix": "http://127.0.0.1:8000/media/",  # 文件访问路径前缀 */
    "fileAllowFiles": [
        ".png", ".jpg", ".jpeg", ".gif", ".bmp",
        ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
        ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
        ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
        ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
    ],  # 上传文件格式显示 */

    # 列出指定目录下的图片 */
    "imageManagerActionName": "listimage",  # 执行图片管理的action名称 */
    "imageManagerListPath": "upload/image/",
    "imageManagerListSize": 30,  # 每次列出文件数量 */
    # 列出的文件类型 */
    "imageManagerAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
    "imageManagerUrlPrefix": "http://127.0.0.1:8000/media/",  # 图片访问路径前缀 */

    # 列出指定目录下的文件 */
    "fileManagerActionName": "listfile",  # 执行文件管理的action名称 */
    "fileManagerListPath": "upload/file/",
    "fileManagerUrlPrefix": "http://127.0.0.1:8000/media/",
    "fileManagerListSize": 30,  # 每次列出文件数量 */
    "fileManagerAllowFiles": [
        ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tif", ".psd"
        ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
        ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
        ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
        ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml",
        ".exe", ".com", ".dll", ".msi"
    ]  # 列出的文件类型 */
}