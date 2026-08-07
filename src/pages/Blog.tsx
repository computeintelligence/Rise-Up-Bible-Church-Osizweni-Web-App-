import { Link } from 'react-router-dom';
import { User, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data';

export default function Blog() {
  return (
    <main className="flex-grow pt-20">
      <div className="w-full bg-white min-h-screen pb-24">
        <section className="relative overflow-hidden border-b border-border bg-background py-20 md:py-24">
          <img src="/images/pastor-nkosi.jpg" alt="Pastor teaching at Rise-Up Bible Church" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/80 to-primary/70"></div>
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <span className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/90 backdrop-blur-md">
              Messages & teachings
            </span>
            <h1 className="mb-6 text-4xl font-display font-extrabold text-white md:text-5xl lg:text-6xl">Our Blog</h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-100">
              Insights, teachings, and updates from the pastoral team at Rise-Up Bible Church.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="h-full">
                  <Link to={`/blog/${post.id}`} className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-border/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-primary/20">
                    <div className="relative h-64 overflow-hidden">
                      <img alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={post.image} />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/10 to-transparent"></div>
                      <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary backdrop-blur">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <User size={14} className="text-primary" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-primary" />
                          {post.date} • {post.readTime}
                        </span>
                      </div>
                      <h3 className="mb-3 text-2xl font-bold font-display text-secondary transition-colors group-hover:text-primary">{post.title}</h3>
                      <p className="mb-6 text-muted-foreground line-clamp-2">{post.subtitle}</p>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="text-sm font-semibold text-primary">Read article</span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
