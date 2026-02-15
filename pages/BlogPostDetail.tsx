import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import ScrollReveal from '../components/ScrollReveal';

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === Number(id));

  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post?.category && p.id !== post?.id)
    .slice(0, 2);

  useEffect(() => {
    if (!post) {
       // Optional: Redirect to blog if not found
    }
  }, [post, navigate]);

  if (!post) {
    return (
        <div className="pt-44 pb-20 px-8 text-center min-h-[60vh] flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
            <Link to="/blog" className="text-primary hover:underline">Return to Blog</Link>
        </div>
    );
  }

  return (
    <article className="animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
        </div>
        
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-8 flex flex-col justify-end pb-20">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors mb-6 font-medium">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Blog
            </Link>
            
            <div className="flex gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-bold uppercase tracking-wider border border-primary/20 backdrop-blur-md">
                    {post.category}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium border border-white/10 backdrop-blur-md">
                    {post.readTime}
                </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">{post.title}</h1>
            
            <div className="flex items-center gap-4">
                <img src={post.author.avatar} alt={post.author.name} className="w-14 h-14 rounded-full object-cover border-2 border-white/10" />
                <div>
                    <div className="text-white font-bold text-lg">{post.author.name}</div>
                    <div className="text-white/60 text-sm">{post.author.role} • {post.date}</div>
                </div>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-8 pb-20">
        <div className="max-w-3xl mx-auto">
           <ScrollReveal>
                <div 
                    className="prose prose-lg prose-invert max-w-none text-white/80 leading-relaxed font-sans"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
           </ScrollReveal>
           
           <hr className="border-white/10 my-16" />
           
           {/* Share / Tags */}
           <div className="flex justify-between items-center mb-16">
               <div className="text-white/40 text-sm font-bold uppercase tracking-wider">Share this article</div>
               <div className="flex gap-4">
                   {['twitter', 'linkedin', 'facebook'].map(social => (
                       <button key={social} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-primary hover:text-background-dark transition-all">
                           <span className="material-symbols-outlined text-lg">share</span>
                       </button>
                   ))}
               </div>
           </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {relatedPosts.map(p => (
                            <Link key={p.id} to={`/blog/${p.id}`} className="group glass-panel rounded-3xl p-6 hover:bg-white/5 transition-colors">
                                <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{p.category}</div>
                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{p.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </article>
  );
};

export default BlogPostDetail;