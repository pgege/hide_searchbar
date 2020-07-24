export default function(kibana) {
  return new kibana.Plugin({
    require: ['kibana', 'elasticsearch'],
    name: 'hide_searchbar',
    uiExports: {
      hacks: ['plugins/hide_searchbar/hack'],
      injectDefaultVars(server) {
        const config = server.config();
        // visible to any plugin
        return {
          roles: config.get('opendistro_security.readonly_mode.roles')
        };
      }
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        roles: Joi.any()
      }).default();
    },
  });
}
