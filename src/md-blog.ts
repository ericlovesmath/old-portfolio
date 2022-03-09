import Showdown from 'showdown';

const blogs: Record<string, string> = import.meta.globEager('./blog/*.md', { assert: { type: 'raw' } })
const conv = new Showdown.Converter({ metadata: true });

// Markdown Blog Testing
export function setBlogs(filename: string) {

  let parsed_filename = `./blog/${filename}.md`;
  if (!(parsed_filename in blogs)) {
    console.log(`Error: "${filename}" not in blogs`);
    return;
  }
  let blogContent = blogs[parsed_filename];
  let html = conv.makeHtml(blogContent);
  // let metadata = conv.getMetadata();
  document.getElementById('markdown-content')!.innerHTML = html;
}

