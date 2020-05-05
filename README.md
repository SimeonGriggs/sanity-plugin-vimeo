# sanity-plugin-vimeo

Once installed, this plugin will create a Schema for Vimeo videos.

The only config required is to put your Vimeo Access Token in an `.env.development` file like:

```
SANITY_STUDIO_VIMEO_ACCESS_TOKEN='xxx'
```

You will see a button at the top of the dashboard (which I would prefer be somewhere else!) which will fetch videos from the Vimeo REST API and insert them into your site.

This plugin is a hot mess as I through it together quickly. YMMV.
