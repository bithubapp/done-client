import AppMap from "can-ssr/app-map";
import "can/map/define/";
import route from 'can/route/';
import "can/route/pushstate/";
import stache from "can/view/stache/";

const pageContext = {
	"index": "static",
	"login": "static"
};

const AppState = AppMap.extend({
	define: {
		title: {
			get() {
				return "Bithub";
			}
		},
		pageComponentConfig: {
			get() {
				if (pageContext.hasOwnProperty(this.attr("page"))) {
					let page = this.attr("page");
					return {
						component: `<bithub-${page} />`,
						context: pageContext[page],
						module: `${page}.component`
					}
				}
			}
		}
	}
});

stache.registerHelper("pageComponents", function(options) {
	let {component: component, context: context, module: module} =
		options.context.attr("pageComponentConfig");
	let template = `
		<can-import from="bithub-admin/${context}/pages/${module}">
			{{#if isResolved}}
				${component}
			{{/if}}
		</can-import>
	`
	return can.stache(template)(this, options.helpers, options.nodeList);
});

route(':page', { page: 'index' });

export default AppState;
