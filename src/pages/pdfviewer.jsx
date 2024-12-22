import React, { useEffect, useRef } from 'react';

const PdfViewer = () => {
    const adobeRef = useRef(null);
    const queryParams = new URLSearchParams(window.location.search);
    const pdfUrl = queryParams.get('pdfUrl'); // 獲取 name 的值

    useEffect(() => {
        const adobeDCView = new window.AdobeDC.View({
            clientId: '1c6b0143f73c4cd18083dea7175435bd', // 替换为您的 API Key
            divId: 'adobe-dc-view',
        });

        adobeDCView.previewFile(
            {
                content: {
                    location: {
                        url: pdfUrl, // PDF 文件的 URL
                    },
                },
                metaData: {
                    fileName: 'Sample.pdf', // 文件名
                },
            },
            {
                embedMode: 'SIZED_CONTAINER', // 嵌入模式：如 SIZED_CONTAINER、IN_LINE、FULL_WINDOW
            }
        );
    }, [pdfUrl]);

    return (
        <div
            id="adobe-dc-view"
            ref={adobeRef}
            style={{ width: '100%', height: '500px' }}
        ></div>
    );
};

export default PdfViewer;