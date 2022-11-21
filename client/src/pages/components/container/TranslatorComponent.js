import React from "react";
import { detectLanguage, changeLanguage } from "../../functions/dom";

const TranslatorComponent = () => {
	React.useLayoutEffect(() => {
		const dropdown = document.querySelectorAll(".dropdown-trigger");
		const options = {
			constrainWidth: false,
			coverTrigger: false,
			hover: true,
			closeOnClick: false
		};
		if (window.M) {
			M.Dropdown.init(dropdown, options);
		}
	});

	const language = detectLanguage();

	return (
		<React.Fragment>
			<li>
				<a className="dropdown-trigger hover" data-target="translator">
					{language}
				</a>
			</li>
			<ul id="translator" className="dropdown-content">
				<li>
					<a id="en" onClick={() => changeLanguage("en")}>
						EN
					</a>
				</li>
				<li>
					<a id="es" onClick={() => changeLanguage("es")}>
						ES
					</a>
				</li>
				<li>
					<a id="fr" onClick={() => changeLanguage("fr")}>
						FR
					</a>
				</li>
				<li>
					<a id="pt" onClick={() => changeLanguage("pt")}>
						PT
					</a>
				</li>
				<li>
					<a id="ru" onClick={() => changeLanguage("ru")}>
						RU
					</a>
				</li>
				<li>
					<a id="tr" onClick={() => changeLanguage("tr")}>
						TR
					</a>
				</li>
				<li>
					<a id="zh-CN" onClick={() => changeLanguage("zh-CN")}>
						ZH
					</a>
				</li>
			</ul>
		</React.Fragment>
	);
};

export default TranslatorComponent;
