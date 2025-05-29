function readingTime(text) {
    const wordsPerMinute = 250; // Adjusted to a more realistic average reading speed
    const noOfWords = text.match(/\b\w+\b/g)?.length || 0; // Improved word counting logic
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.max(Math.ceil(minutes), 1); // Ensure at least 1 minute for very short articles
    return `${readTime} minute read`;
}

document.addEventListener("DOMContentLoaded", () => {
    const timeToReadElements = document.querySelectorAll(".time-to-read");

    timeToReadElements.forEach((element) => {
        const articleLink = element.previousElementSibling;
        if (articleLink && articleLink.href) {
            fetch(articleLink.href)
                .then((response) => response.text())
                .then((html) => {
                    // Parse the HTML and extract only the blog section content
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const blogSection = doc.querySelector('#blog');
                    
                    if (blogSection) {
                        const textContent = blogSection.textContent || blogSection.innerText || '';
                        const readTime = readingTime(textContent);
                        element.textContent = readTime;
                    } else {
                        // Fallback: try to find article or main content
                        const article = doc.querySelector('article, main, .content');
                        const textContent = article ? 
                            (article.textContent || article.innerText || '') : 
                            '';
                        const readTime = readingTime(textContent);
                        element.textContent = readTime;
                    }
                })
                .catch((error) => {
                    console.error("Error fetching article content:", error);
                    element.textContent = "~ min read";
                });
        }
    });
});