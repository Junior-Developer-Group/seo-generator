const outputCode = document.querySelector(".output code")
const outputCopyButton = document.querySelector(".output__copy")
const inputKeywords = document.querySelector("#input-keywords")
const inputKeywordsMessage = document.querySelector("#input-keywords__message")

inputKeywords.addEventListener("input", (event) => {
	const {target: {value}} = event
	const trimmedValue = value.trim().replace(/^([\s,]*)|([\s,]*)$/g, "") // Remove comma(s) at beginning and end of value

	// Invalid value: (Any value containing special character)
	if((/[^\w\s,]/g).test(trimmedValue)){
		inputKeywordsMessage.textContent = "Please enter only alphanumeric characters"
		inputKeywords.setAttribute("aria-invalid", true)
	}
	// Invalid value: keyword1, , keyword2
	else if((/,\s*,/g).test(trimmedValue)){
		inputKeywordsMessage.textContent = "Please ensure there is no trailing comma"
		inputKeywords.setAttribute("aria-invalid", true)
	}
	else{
		inputKeywordsMessage.textContent = ""
		inputKeywords.removeAttribute("aria-invalid")
		updateCodeElement("meta-keywords", trimmedValue.length > 0 && `<meta name="keywords" content="${trimmedValue}">`)
	}
})

/**
 * Set textContent of <span> child in outputCode
 * Remove if value's length is zero
 * @param {number} id 
 * @param {string} value 
 */
const updateCodeElement = (id, value) => {
	const codeElement = outputCode.querySelector(`#${id}`)
	
	if(value && value.length > 0){
		if(!codeElement){
			const newCodeElement = document.createElement("span")
			newCodeElement.id = id
			newCodeElement.textContent = value
			outputCode.appendChild(newCodeElement)
		}
		else{
			codeElement.textContent = value
		}
	}
	else{
		outputCode.removeChild(codeElement)
	}
}

outputCopyButton.addEventListener("click", () => {
	navigator.clipboard.writeText(outputCode.textContent.trim())
})


