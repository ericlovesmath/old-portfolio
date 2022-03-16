import Showdown from 'showdown';

const pages: Record<string, string> = import.meta.globEager('./pages/*.md', { assert: { type: 'raw' } })
const blogs: Record<string, string> = import.meta.globEager('./pages/blogs/*.md', { assert: { type: 'raw' } })
const conv = new Showdown.Converter({ metadata: true });
const $contentContainer = document.getElementById('content-container')!;
const PARSED_BLOGS: metadata[] = [];

export function setPage(filename: string) {
  let parsed_filename = `./pages/${filename}.md`;
  if (!(parsed_filename in pages)) {
    console.log(`Error: "${filename}" not in blogs`);
    return;
  }
  let pageContent = pages[parsed_filename];
  let html = conv.makeHtml(pageContent);
  // let metadata = conv.getMetadata();
  $contentContainer.innerHTML = html;
}

export function showBlogs() {
  parseBlogs();
  console.log(PARSED_BLOGS);
}

function parseBlogs() {
  for (let key in blogs) {
    let blogContent = blogs[key];
    let html = conv.makeHtml(blogContent);
    let metadata = parseMetadata(key, conv.getMetadata() as Showdown.Metadata);
    // PARSED_BLOGS[metadata.id] = metadata;
    PARSED_BLOGS.push(metadata);
  }
  PARSED_BLOGS.sort((a, b) => ((a.date > b.date) ? 1 : (b.date > a.date) ? -1 : 0))
}

type metadata = {
  filepath: string;
  title: string;
  desc: string;
  date: Date;
  // id: number;
  tags: string[];
}

function parseMetadata(path: string, data: Showdown.Metadata): metadata {
  let parsed_date = new Date(data.date);
  return {
    filepath: path,
    title: data.title,
    desc: data.description,
    date: parsed_date,
    tags: data.tags.split(" "),
    // id: parseInt(data.id)
  }
}
