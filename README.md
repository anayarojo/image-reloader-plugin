# Image reloader plugin
Plugin de utilería para imágenes

### Uso básico

```javascript
ImageReloader.init({
    container: '.container'
});
```

### Uso avanzado

```javascript
ImageReloader.init({
    container: '.container',
    customs: {
      refresh = {
        icon: '<i class="fa fa-refresh" aria-hidden="true"></i>',
        text: 'Recargar'
      },
      loading: {
        icon: '<i class="fa fa-refresh fa-spin" aria-hidden="true"></i>',
        text: 'Cargando...'
      },
      images = {
        default: 'img/img-default.jpg',
        default720: 'img/img-default-720x478.jpg',
        default360: 'img/img-default-360x239.jpg',
        default180: 'img/img-default-180x120.jpg',
    }
    }
});
```
