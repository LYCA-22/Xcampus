import React, { useEffect, useRef } from 'react';

const PdfViewer = () => {
    const adobeRef = useRef(null);

    useEffect(() => {
        const adobeDCView = new window.AdobeDC.View({
            clientId: 'd5f3385b39874babac9b20f09b9b637c', // 替换为您的 API Key
            divId: 'adobe-dc-view',
        });

        // 预览文件
        adobeDCView.previewFile(
            {
                content: {
                    location: {
                        url: './assets/school.pdf', // PDF 文件的 URL，指向静态资源
                    },
                },
                metaData: {
                    fileName: '113.pdf', // 根据 URL 获取文件名
                },
            },
            {
                embedMode: 'SIZED_CONTAINER', // 嵌入模式：SIZED_CONTAINER、IN_LINE、FULL_WINDOW
            }
        );

    }, []); // 当 pdfUrl 变化时重新执行

    return (
        <div>
            <div
                id="adobe-dc-view"
                ref={adobeRef}
                style={{ width: '100%', height: '600px' }}
            ></div>
        </div>
    );
};

export default PdfViewer;