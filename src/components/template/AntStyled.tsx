'use client';

import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

export default function AntdStyled({ children }: { children: React.ReactNode }) {
    const [cache] = React.useState(() => createCache());

    
    useServerInsertedHTML(() => (
        <style
            id="antd"
            dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
        />
    ));

    return <StyleProvider cache={cache}>{children}</StyleProvider>;
}