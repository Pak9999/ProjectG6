// ArticleDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ArticleDetail() {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetchArticle();
    }, [articleId]);

    const fetchArticle = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/articles/${articleId}/`);
            setArticle(response.data);
        } catch (error) {
            console.error('Error fetching article:', error.message);
        }
    };

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{article.under_title}</h1>
            <p>{article.content}</p>
        </div>
    );
}

export default ArticleDetail;
