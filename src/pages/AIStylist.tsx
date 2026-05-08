import React, { useState } from 'react';
import { PageTransition } from '../components/PageTransition';
import { products } from '../lib/mockData';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

export function AIStylist() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendation, setRecommendation] = useState<{ text: string; products: Product[] } | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setRecommendation(null);

    try {
      // Simulate checking available inventory
      const catalogue = products.map(p => `- ${p.name} (${p.category}): ${p.description}`).join('\n');
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [{
              text: `You are an elite fashion stylist for a luxury brand 'AURA'. 
The user is looking for an outfit with this preference: "${prompt}".
Based on our current catalogue:
${catalogue}

Provide a short, sophisticated paragraph recommending a specific look. 
At the end, list exactly the names of 2 or 3 products from the catalogue that make up this look, comma separated, prefixed with "SELECTED_PRODUCTS: ".`
            }]
          }
        ]
      });

      const responseText = response.text || '';
      const textParts = responseText.split('SELECTED_PRODUCTS:');
      
      const stylistText = textParts[0].trim();
      const productNames = textParts[1] ? textParts[1].split(',').map(n => n.trim().toLowerCase()) : [];

      const recommendedProducts = products.filter(p => 
        productNames.some(name => p.name.toLowerCase().includes(name))
      );

      // Fallback if AI didn't match names perfectly
      const finalProducts = recommendedProducts.length > 0 ? recommendedProducts : products.slice(0, 3);

      setRecommendation({
        text: stylistText,
        products: finalProducts
      });

    } catch (error) {
      console.error(error);
      // Fallback response for demo if API fails
      setRecommendation({
        text: "For this aesthetic, I recommend layering our Void Oversized Hoodie beneath the Obsidian Trench Coat for a striking play on proportion. The Aura Utility Cargo anchors the look with industrial edge.",
        products: [products[0], products[2], products[1]]
      });
    } finally {
       setIsGenerating(false);
    }
  };

  return (
    <PageTransition>
       <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-[80vh]">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif tracking-widest uppercase text-white mb-6">AI Styling Studio</h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-sm tracking-wide leading-relaxed">
              Describe your destination, desired aesthetic, or current mood. Our generative styling engine will construct a bespoke architectural ensemble from our collection.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-white/10 p-8 md:p-12 rounded-sm mb-16 max-w-3xl mx-auto backdrop-blur-sm">
             <form onSubmit={handleGenerate} className="relative">
                <div className="absolute top-4 left-4 text-zinc-500">
                  <Sparkles size={20} />
                </div>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. I need a sharp, monochromatic look for an evening gallery opening in Tokyo. It will be slightly chilly."
                  className="w-full bg-black/50 border border-white/20 p-4 pl-12 pt-4 pb-16 text-sm text-white focus:border-white outline-none transition-colors rounded-sm resize-none min-h-[120px]"
                />
                <button 
                  type="submit" 
                  disabled={isGenerating || !prompt.trim()}
                  className="absolute bottom-4 right-4 bg-white text-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:hover:bg-white rounded-sm flex items-center gap-2"
                >
                  {isGenerating ? (
                    <><Loader2 size={14} className="animate-spin" /> Analyzing</>
                  ) : (
                    <><Sparkles size={14} /> Generate</>
                  )}
                </button>
             </form>
          </div>

          <AnimatePresence>
            {recommendation && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-white/10 pt-16"
              >
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   <div className="lg:col-span-1">
                      <h3 className="text-xs uppercase tracking-widest font-semibold text-zinc-500 mb-6 flex items-center gap-2">
                        <Sparkles size={14} /> Stylist Note
                      </h3>
                      <p className="text-sm text-zinc-300 leading-relaxed font-serif italic text-lg border-l-2 border-white/20 pl-6">
                        "{recommendation.text}"
                      </p>
                   </div>
                   <div className="lg:col-span-2">
                      <h3 className="text-xs uppercase tracking-widest font-semibold text-zinc-500 mb-6">Curated Selection</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendation.products.map(product => (
                          <div key={product.id}>
                            <ProductCard product={product} />
                          </div>
                        ))}
                      </div>
                   </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
       </div>
    </PageTransition>
  );
}
