"use strict";

//#region src/index.ts
const createMultiOptimizedPicture = (pictures) => {
	if (!pictures || pictures.length === 0) {
		console.error("No pictures provided");
		return null;
	}
	const pictureEl = document.createElement("picture");
	pictures.forEach((picture, i) => {
		const lastElement = i === pictures.length - 1;
		const { src, alt = "", eager = false, breakpoints = [{
			media: "(min-width: 600px)",
			width: 2000
		}, { width: 750 }] } = picture;
		const url = new URL(src, window.location.href);
		const { pathname } = url;
		const ext = pathname.substring(pathname.lastIndexOf(".") + 1);
		breakpoints.forEach((br) => {
			const source = document.createElement("source");
			if (br.media) source.setAttribute("media", br.media);
			source.setAttribute("type", "image/webp");
			source.setAttribute("srcset", `${pathname}?width=${br.width}&format=webply&optimize=medium`);
			pictureEl.appendChild(source);
		});
		breakpoints.forEach((br, i$1) => {
			if (i$1 < breakpoints.length - 1) {
				const source = document.createElement("source");
				if (br.media) source.setAttribute("media", br.media);
				source.setAttribute("srcset", `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
				pictureEl.appendChild(source);
			} else if (lastElement) {
				const img = document.createElement("img");
				img.setAttribute("loading", eager ? "eager" : "lazy");
				img.setAttribute("alt", alt);
				pictureEl.appendChild(img);
				img.setAttribute("src", `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
			}
		});
	});
	return sortPictureElement(pictureEl);
};
const sortPictureElement = (pictures) => {
	const sources = Array.from(pictures.querySelectorAll("source"));
	const img = pictures.querySelector("img");
	sources.sort(breakpointSort);
	pictures.innerHTML = "";
	sources.forEach((source) => {
		pictures.appendChild(source);
	});
	if (img) {
		pictures.appendChild(img);
	}
	return pictures;
};
const minWidthRegex = /.*min-width: *(\d+)px/;
const breakpointSort = (a, b) => {
	const a_width = parseMinWidth(a);
	const b_width = parseMinWidth(b);
	console.log(a_width, b_width);
	return b_width - a_width;
};
const parseMinWidth = (source) => {
	const media = source.getAttribute("media") || "";
	return minWidthRegex.test(media) ? parseInt(minWidthRegex.exec(media)[1], 10) : 0;
};

//#endregion
Object.defineProperty(exports, 'createMultiOptimizedPicture', {
  enumerable: true,
  get: function () {
    return createMultiOptimizedPicture;
  }
});
//# sourceMappingURL=index.js.map