import Showdown from 'showdown';

const pages: Record<string, string> = import.meta.globEager('./pages/*.md', { assert: { type: 'raw' } })
const conv = new Showdown.Converter({ metadata: true });

// Markdown Blog Testing
export function setPage(filename: string) {

  let parsed_filename = `./pages/${filename}.md`;
  if (!(parsed_filename in pages)) {
    console.log(`Error: "${filename}" not in blogs`);
    return;
  }
  let blogContent = pages[parsed_filename];
  let html = conv.makeHtml(blogContent);
  // let metadata = conv.getMetadata();
  document.getElementById('markdown-container')!.innerHTML = html;
}

