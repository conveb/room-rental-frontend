// components/Title.jsx
import { useEffect } from 'react';

const Title = ({ children }) => {
  useEffect(() => {
    // Store original values to restore later
    const originalTitle = document.title;
    const originalMetaTags = [];
    
    // Process children to find title and meta tags
    const processChildren = (elements) => {
      if (!elements) return;
      
      const childrenArray = Array.isArray(elements) ? elements : [elements];
      
      childrenArray.forEach(child => {
        if (!child || !child.props) return;
        
        // Handle title
        if (child.type === 'title') {
          document.title = child.props.children;
        }
        
        // Handle meta tags
        if (child.type === 'meta') {
          const { name, content, property } = child.props;
          
          // Check if meta tag already exists
          let metaTag = null;
          
          if (name) {
            metaTag = document.querySelector(`meta[name="${name}"]`);
          } else if (property) {
            metaTag = document.querySelector(`meta[property="${property}"]`);
          }
          
          if (metaTag) {
            // Update existing
            metaTag.setAttribute('content', content);
            originalMetaTags.push({ type: 'update', element: metaTag, originalContent: metaTag.getAttribute('content') });
          } else {
            // Create new
            const newMeta = document.createElement('meta');
            if (name) newMeta.setAttribute('name', name);
            if (property) newMeta.setAttribute('property', property);
            newMeta.setAttribute('content', content);
            document.head.appendChild(newMeta);
            originalMetaTags.push({ type: 'new', element: newMeta });
          }
        }
      });
    };
    
    processChildren(children);
    
    // Cleanup function to restore original values
    return () => {
      document.title = originalTitle;
      
      // Remove or restore meta tags
      originalMetaTags.forEach(tag => {
        if (tag.type === 'update' && tag.element) {
          tag.element.setAttribute('content', tag.originalContent || '');
        } else if (tag.type === 'new' && tag.element && tag.element.parentNode) {
          tag.element.parentNode.removeChild(tag.element);
        }
      });
    };
  }, [children]);
  
  return null;
};

export default Title;