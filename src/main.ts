import { initFooter } from './footer';
import { initTabBar } from './header';
import { setPage } from './md-pages';
import './style.css'

main()

function main() {
  initTabBar("index");
  initFooter();
  setPage("index");
}

