## Image Gallery Effects

This website uses [Photoswipe Plugin](https://github.com/dimsemenov/PhotoSwipe) to create nice, mobile-friendly image galleries with zoom effects. It also uses [PhotoSwipe's Dyanmic Caption Plugin](https://github.com/dimsemenov/photoswipe-dynamic-caption-plugin) to add captions to the Image Galleries.

## Setup Steps

To create an image gallery, you need to follow the following steps:

1. Create a div with the class of `pswp-gallery`.
2. Inside the div from step 1, add anchor tags with the class of `pswp-img`. 
    - The `href` of this anchor tag should point to the full-resolution image
    - Add the property `data-pswp-width` with the integer value of the image's width at full resolution
    - Add the property `data-pswp-height` with the integer value of the image's height at full resolution
3. Inside the anchor tag, add an `img` tag. 
    - The `src` attribute of this img tag should point to the thumbnail you want to load
4. Use the `alt` tag of the image to create a caption.
5. Optional: If you want your caption to be a custom element with custom styles add a `span` tag with the class of `pswp-caption-content`, then this will be used as the caption.

Then, we can initialize the galleries with caption support with the following snippet:

```javascript
  <script type="text/javascript">
      const lightbox = new PhotoSwipeLightbox({
      gallery: '.pswp-gallery',
      // Elements within gallery (slides)
      children: 'a.pswp-img',
      showHideAnimationType: 'fade',
      preloaderDelay: 0,
      pswpModule: PhotoSwipe
    });

    const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {type: 'auto'});

    lightbox.init();
  </script>
```

## Examples

Here is an example gallery without captions:

```html
<div class="pswp-gallery">
    <a class="pswp-img" href="https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg" data-pswp-width="1875" data-pswp-height="2500" target="_blank">
      <img src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg" alt="">
    </a>
    <a class="pswp-img" href="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg" data-pswp-width="1669" data-pswp-height="2500" target="_blank">
      <img src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg" alt="">
    </a>
  </div>
```
Here is an example gallery with captions:

```html
<div class="pswp-gallery">
    <a class="pswp-img" href="https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg" data-pswp-width="1875" data-pswp-height="2500" target="_blank">
      <img src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg" alt="">
      <span class="pswp-caption-content">A beautiful view of the lake</a>
    </a>
    <a class="pswp-img" href="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg" data-pswp-width="1669" data-pswp-height="2500" target="_blank">
      <img src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg" alt="">
      <span class="pswp-caption-content">A beautiful view of the mountains</a>
    </a>
  </div>
```

## Notes

### Opening Animations

The photoswipe plugin accepts the following values for the `showHideAnimationType` configuration: `fade`. `zoom` and `none`. The fade and zoom effects work best when the thumbnail is a scaled version of the full-resolution image, and while the thumbnail can scaled down, the aspect ratio should match the aspect ratio of the full resolution image.
