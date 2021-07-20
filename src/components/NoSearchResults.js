import React from "react";

function NoSearchResults() {
    const gallery = document.querySelector(".photo-container");
    if (gallery) {
        gallery.style.display = "none";
    }

    return (
        <h1 className="no-results">No Images Found</h1>
    )
}

export default NoSearchResults;