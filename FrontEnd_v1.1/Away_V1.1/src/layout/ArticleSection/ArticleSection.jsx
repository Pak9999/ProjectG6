import React from 'react';
import ArticleAside from '../../components/ArticleAside/ArticleAside'; 

import './ArticleSection.css'

function ArticleSection() {
    return (
        <main className="article-main" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <section className='article-section'>
                <p className='article-section-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vitae accusamus consectetur officia nam voluptatem molestiae dolorem magnam optio modi ad labore deleniti eos velit, voluptate dolorum unde mollitia voluptatum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vitae accusamus consectetur officia nam voluptatem molestiae dolorem magnam optio modi ad labore deleniti eos velit, voluptate dolorum unde mollitia voluptatum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vitae accusamus consectetur officia nam voluptatem molestiae dolorem magnam optio modi ad labore deleniti eos velit, voluptate dolorum unde mollitia voluptatum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vitae accusamus consectetur officia nam voluptatem molestiae dolorem magnam optio modi ad labore deleniti eos velit, voluptate dolorum unde mollitia voluptatum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vitae accusamus consectetur officia nam voluptatem molestiae dolorem magnam optio modi ad labore deleniti eos velit, voluptate dolorum unde mollitia voluptatum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vitae accusamus consectetur officia nam voluptatem molestiae dolorem magnam optio modi ad labore deleniti eos velit, voluptate dolorum unde mollitia voluptatum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vitae accusamus consectetur officia nam voluptatem molestiae dolorem magnam optio modi ad labore deleniti eos velit, voluptate dolorum unde mollitia voluptatum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vitae accusamus consectetur officia nam voluptatem molestiae dolorem magnam optio modi ad labore deleniti eos velit, voluptate dolorum unde mollitia voluptatum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vitae accusamus consectetur officia nam voluptatem molestiae dolorem magnam optio modi ad labore deleniti eos velit, voluptate dolorum unde mollitia voluptatum.
                
                </p>

                <p className='article-section-text'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, cupiditate dolore totam ipsum temporibus blanditiis praesentium quis modi repudiandae, eos soluta voluptates quo, deleniti tenetur dolor consequuntur quas exercitationem quae!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero perspiciatis asperiores culpa quidem, consequatur eos obcaecati voluptatibus repellendus corporis consectetur inventore enim, quibusdam dicta modi. Dicta voluptas alias nulla dolores?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quas itaque, nesciunt vel similique quaerat repellat quam, sint ducimus et minima quo voluptas ullam at hic officia incidunt error iste?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque nemo nobis aperiam hic, quibusdam dignissimos consectetur rerum ex, labore reiciendis consequuntur harum. Ipsa quisquam veniam aut architecto quis quae minima.
                </p>

            </section>
            <ArticleAside /> {/* Use the aside component */}
        </main>
    );
}

export default ArticleSection;