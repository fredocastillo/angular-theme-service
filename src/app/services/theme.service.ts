import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer: Renderer2;
  private colorScheme: string = ''
  private colorSchemePrefix = 'color-scheme-';

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    detectPrefersColorScheme() {
        if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
          this.colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
          this.colorScheme = 'light';
        }
        this.saveColorScheme(this.colorScheme);
    }

    saveColorScheme(scheme: string) {
        this.colorScheme = scheme;
        localStorage.setItem('prefers-color', scheme);
    }

    setColorScheme() {
        const localStorageColorScheme = localStorage.getItem('prefers-color');
        if (localStorageColorScheme) {
            this.colorScheme = localStorageColorScheme;
        } else {
          this.detectPrefersColorScheme();
        }
    }

    load() {
        this.setColorScheme();
        this.renderer.addClass(document.body, this.colorSchemePrefix + this.colorScheme);
    }

    update(scheme: string) {
        this.saveColorScheme(scheme);
        this.renderer.removeClass(document.body, this.colorSchemePrefix + (this.colorScheme === 'dark' ? 'light' : 'dark'));
        this.renderer.addClass(document.body, this.colorSchemePrefix + scheme);
    }

    currentActive() {
        return this.colorScheme;
    }
}
