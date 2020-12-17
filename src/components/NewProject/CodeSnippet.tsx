import React, { Suspense, lazy } from 'react';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('./SyntaxHighlighter'));

dark.hljs.padding = '10px';

const makeCodeSnippet = (dsn: string) => {
  return `import Panopticon from 'pan-opt';
    
  const dsn = '${dsn}'
  
  Panopticon.init(dsn);`;
};

interface IProps {
  DSN: string;
}

function CodeSnippet(props: IProps): React.ReactElement {
  const { DSN } = props;

  return (
    <>
      <Suspense fallback={<div style={{ height: '123px' }}>Loading...</div>}>
        <SyntaxHighlighter language="javascript" style={dark}>
          {makeCodeSnippet(DSN)}
        </SyntaxHighlighter>
      </Suspense>
    </>
  );
}

export default CodeSnippet;
