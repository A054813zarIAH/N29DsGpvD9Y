// 代码生成时间: 2025-10-09 02:45:18
import React, { useState, useEffect, useRef } from 'react';

// 懒加载图片组件
const LazyImageLoader: React.FC<{ src: string; alt?: string; placeholder?: string }> = ({ src, alt, placeholder = 'loading...' }) => {
    const [imageSrc, setImageSrc] = useState<string>(placeholder);
    const imgRef = useRef<HTMLImageElement>(null);

    // 监听元素是否进入视口
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // 创建IntersectionObserver实例
        observer.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 当元素可见时，加载图片
                    setImageSrc(src);
                    // 取消监听
                    observer.current!.unobserve(entry.target);
                }
            });
        });

        // 监听图片是否进入视口
        if (imgRef.current) {
            observer.current!.observe(imgRef.current);
        }

        // 组件卸载时，停止监听
        return () => {
            if (observer.current && imgRef.current) {
                observer.current.unobserve(imgRef.current);
            }
        };
    }, [src]);

    return (
        // 使用img标签来显示图片，src属性设置为当前状态的图片地址
        <img
            src={imageSrc}
            alt={alt}
            ref={imgRef}
            onError={(e) => {
                // 错误处理，图片加载失败时可以设置默认图片或显示错误信息
                setImageSrc('error-placeholder.jpg'); // 假设有一个默认的错误图片
                console.error('Failed to load image:', e);
            }}
        />
    );
};

export default LazyImageLoader;