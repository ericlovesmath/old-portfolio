import Showdown from 'showdown';

const pages: Record<string, string> = import.meta.globEager('./pages/*.md', { assert: { type: 'raw' } })
const blogs: Record<string, string> = import.meta.globEager('./pages/blogs/*.md', { assert: { type: 'raw' } })
const conv = new Showdown.Converter({ metadata: true });
const $contentContainer = document.getElementById('content-container')!;
const PARSED_BLOGS: metadata[] = [];

export function setPage(filename: string) {
  if (!(filename in pages) && !(filename in blogs)) {
    console.log(`Error: "${filename}" not in pages or blogs`);
    return;
  }

  let pageContent;
  if (filename in pages) {
    pageContent = pages[filename];
  } else {
    pageContent = blogs[filename];
  }

  $contentContainer.innerHTML = conv.makeHtml(pageContent);
}

export function setBlogPreviews() {
  $contentContainer.innerHTML = "";

  let title = document.createElement('h1');
  let $listContainer = document.createElement('ul');
  title.textContent = "Blog Posts";

  $contentContainer.appendChild(title)
  $contentContainer.appendChild($listContainer);
  showBlogs($listContainer);
}

function showBlogs(listContainer: HTMLUListElement) {
  if (PARSED_BLOGS.length == 0) {
    parseBlogs();
  }
  console.log(PARSED_BLOGS);
  PARSED_BLOGS.forEach((blog: metadata) => {
    let link = document.createElement('a');
    link.onclick = () => { setPage(blog.filepath) };
    link.innerText = blog.title;
    let linkItem = document.createElement('li');
    linkItem.appendChild(link);
    listContainer.appendChild(linkItem);
  })
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
