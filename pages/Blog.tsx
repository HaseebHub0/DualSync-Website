import React, { useState } from 'react';
import { blogPosts } from '../data/blogPosts';
import ScrollReveal from '../components/ScrollReveal';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))];

  const filteredPosts = activeCategory === "All" ? blogPosts : blogPosts.filter(p => p.category === activeCategory);
  
  // Separate featured post (first one) from the rest for the grid layout
  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className="pt-44 pb-20 px-4 sm:px-8 animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-wider">
             Our Journal
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Insights & Updates</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Thoughts on technology, design, and the future of digital product development.
          </p>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-primary text-background-dark' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <ScrollReveal>
            <Link to={`/blog/${featuredPost.id}`} className="block group glass-card rounded-[2.5rem] p-4 md:p-6 mb-12 hover:border-primary/30 cursor-pointer">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-3/5 rounded-[2rem] overflow-hidden aspect-video md:aspect-auto relative">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="w-full md:w-2/5 flex flex-col justify-center py-4 pr-4">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold uppercase tracking-wider border border-white/5">{featuredPost.category}</span>
                        <span className="text-white/40 text-xs">• {featuredPost.readTime}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{featuredPost.title}</h2>
                    <p className="text-white/60 text-lg mb-8 line-clamp-3">{featuredPost.excerpt}</p>
                    
                    <div className="flex items-center gap-3 mt-auto">
                        <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                        <div>
                            <div className="text-white font-bold text-sm">{featuredPost.author.name}</div>
                            <div className="text-white/40 text-xs">{featuredPost.date}</div>
                        </div>
                    </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 100}>
              <Link to={`/blog/${post.id}`} className="group glass-panel rounded-[2rem] overflow-hidden flex flex-col h-full hover:bg-white/5 transition-colors cursor-pointer border border-white/5 hover:border-white/10">
                <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                        {post.category}
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <div className="text-white/40 text-xs mb-3 flex items-center gap-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-white/60 text-sm mb-6 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                            <span className="text-white/60 text-xs font-medium">{post.author.name}</span>
                        </div>
                        <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center">
                            Read <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                        </span>
                    </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
            <div className="text-center py-20">
                <div className="text-white/40 text-lg">No posts found in this category.</div>
                <button onClick={() => setActiveCategory("All")} className="mt-4 text-primary font-bold hover:underline">View All Posts</button>
            </div>
        )}

      </div>
    </div>
  );
};

export default Blog;