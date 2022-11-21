import React from "react";
import { AppContext } from "providers/AppProvider";

function ThemeChangerSideNavComponent() {
	const { callReducer } = React.useContext(AppContext);

	return (
		<li className="no-padding">
			<ul className="collapsible collapsible-accordion">
				<li className="active">
					<a className="collapsible-header">
						Theme
						<i className="material-icons notranslate">arrow_drop_down</i>
					</a>
					<div className="collapsible-body">
						<ul>
							<li>
								<a
									className="sidenav-close"
									onClick={() =>
										callReducer({ dispatch: "UPDATE_THEME", data: "DARK" })
									}
								>
									<span className="material-icons notranslate">bookmark</span>
									Dark
								</a>
							</li>
							<li>
								<a
									className="sidenav-close"
									onClick={() =>
										callReducer({ dispatch: "UPDATE_THEME", data: "LIGHT" })
									}
								>
									<span className="material-icons notranslate">
										bookmark_border
									</span>
									Light
								</a>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</li>
	);
}

export default ThemeChangerSideNavComponent;
