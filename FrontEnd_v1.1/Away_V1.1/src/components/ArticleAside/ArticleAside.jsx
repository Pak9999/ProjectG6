import React from 'react';

import './ArticleAside.css'

function ArticleAside() {
    return (
        <aside className='article-aside'>
            {/* Facts and stuff */}
            <h2>Information</h2>
            <p>Here are some facts...</p>

            <h2>Priser</h2>
            <ul>
                <li>Ölpriser: </li>
                <li>Mat: </li>
                <li>Boende: </li>
            </ul>
        </aside>
    );
}

export default ArticleAside;