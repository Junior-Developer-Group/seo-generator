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
	}
})

