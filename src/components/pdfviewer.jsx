import React, { useEffect, useRef, useState } from 'react';

const PdfViewer = ({
                       pdfUrl = './school.pdf',
                       fileName = 'document.pdf',
                       clientId = 'd5f3385b39874babac9b20f09b9b637c',
                       height = '600px'
                   }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const viewerRef = useRef(null);

    useEffect(() => {
        const initPdfViewer = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // 确保 Adobe DC View SDK 已加载
                if (typeof window.AdobeDC === 'undefined') {
                    throw new Error('Adobe DC View SDK 未加载，请确保已引入相关脚本');
                }

                // 初始化查看器
                viewerRef.current = new window.AdobeDC.View({
                    clientId,
                    divId: 'adobe-dc-view',
                });

                // 预览文件
                await viewerRef.current.previewFile(
                    {
                        content: {
                            location: {
                                url: pdfUrl,
                            },
                        },
                        metaData: {
                            fileName: fileName,
                        },
                    },
                    {
                        embedMode: 'SIZED_CONTAINER',
                        showDownloadPDF: true,
                        showPrintPDF: true,
                        showLeftHandPanel: true,
                        showAnnotationTools: true,
                    }
                );

                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
                console.error('PDF 查看器初始化失败:', err);
            }
        };

        initPdfViewer();

        // 清理函数
        return () => {
            if (viewerRef.current) {
                // 如果 Adobe DC View SDK 提供了销毁方法，在这里调用
                viewerRef.current = null;
            }
        };
    }, [pdfUrl, clientId, fileName]);

    if (error) {
        return (
            <div className="p-4 text-red-500">
                加载 PDF 时发生错误: {error}
            </div>
        );
    }

    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                    加载中...
                </div>
            )}
            <div
                id="adobe-dc-view"
                ref={containerRef}
                className="w-full"
                style={{ height }}
            />
        </div>
    );
};

export default PdfViewer;
