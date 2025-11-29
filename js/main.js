let canvasTheme = 0; //0:dark 1:light

//--------ロード時の挙動・テーマ設定--------//
//----Load----//
$(document).ready(function () {
  refreshSnippetList();
  refreshTagFilterItems();
  refreshTagEditorItems([]);
});

//----Change Canvas Theme----//
$("#toggleCanvasTheme").on("click", function () {
  changeCanvasTheme();
});

function changeCanvasTheme() {
  if (canvasTheme === 0) {
    $("#toggleCanvasTheme").html("🌞");
    $(".preview-canvas").addClass("canvas-dark");
    canvasTheme = 1;
  } else {
    $("#toggleCanvasTheme").html("🌙");
    $(".preview-canvas").removeClass("canvas-dark");
    canvasTheme = 0;
  }
}

//--------スニペット管理--------//
//----Select Snippet----//
$(document).on("click", ".item-title", function (e) {
  e.stopPropagation();

  const li = $(this).closest("li");
  const key = li.data("key");
  const raw = localStorage.getItem(key);
  const obj = JSON.parse(raw);
  const value = obj.snippet;
  const associatedTags = obj.tags || [];

  $("#codename").val(key);
  $("#codearea").val(value);

  refreshTagEditorItems(associatedTags);
});

//----Save Snippet----//
$("#save").on("click", function () {
  const key = $("#codename").val();
  const code = $("#codearea").val();

  data = {
    snippet: code,
    tags: [],
  };

  if (key == "" || code == "") {
    alert("Please enter both the name and the snippet.");
    return;
  }

  localStorage.setItem(key, JSON.stringify(data));

  const html = `
    <li data-key="${key}" class="item">
      <div class="item-title">${key}</div>
      <button class="delete-btn">×</button>
    </li>
  `;

  if ($(`li[data-key="${key}"]`).length === 0) {
    $("#item-list").append(html);
    alert("Saved!");
  } else {
    alert("Updated!");
  }
});

//----Delete Snippet----//
$(document).on("click", ".delete-btn", function (e) {
  e.stopPropagation();
  if (
    !confirm(
      "Are you sure you want to delete this item? This action cannot be undone."
    )
  ) {
    return;
  }
  const li = $(this).closest("li");
  const key = li.data("key");
  localStorage.removeItem(key);
  li.remove();
  alert("Deleted!");
});

//----Clear Editor----//
$("#clear").on("click", function () {
  $("#codename").val("");
  $("#codearea").val("");
  alert("Cleared!");
});

//----Copy Snippet----//
$("#copy").on("click", function () {
  const code = $("#codearea").val();
  if (code === "") {
    alert("The snippet area is empty.");
    return;
  }
  console.log(code);
  navigator.clipboard.writeText(code).then(function () {
    alert("Copied!");
  });
});

//----Apply Snippet----//
$("#apply").on("click", function () {
  const code = $("#codearea").val();
  if (code === "") {
    alert("The snippet area is empty.");
    return;
  }
  console.log(code);
  $("#snippetTarget").attr("style", code);
  alert("Applied the style!");
});

//----Remove Styles----//
$("#remove").on("click", function () {
  $("#snippetTarget").attr("style", "");
  alert("Removed the style!");
});

//----Search Snippet----//
$("#search").on("keyup", function () {
  refreshSnippetList();
});

function refreshSnippetList() {
  const keyword = $("#search").val().toLowerCase().trim();
  const selectedTags = getSelectedTags();

  $("#item-list").empty();

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === "tagList") continue;
    const title = key.toLowerCase().trim();
    const raw = localStorage.getItem(key);
    const obj = JSON.parse(raw);
    const snippetTags = obj.tags || [];
    const html = `
      <li data-key="${key}" class="item">
        <div class="item-title">${key}</div>
        <button class="delete-btn">×</button>
      </li>
    `;

    let hit = true;
    if (keyword !== "" && !title.includes(keyword)) {
      continue;
    }

    for (let j = 0; j < selectedTags.length; j++) {
      const tag = selectedTags[j];

      if (!snippetTags.includes(tag)) {
        hit = false;
        break;
      }
    }
    if (!hit) continue;

    $("#item-list").append(html);
  }
}

//--------タグ管理-------//
//----Tag Management----//
function getTagList() {
  return JSON.parse(localStorage.getItem("tagList")) || [];
}

function saveTagList(arr) {
  localStorage.setItem("tagList", JSON.stringify(arr));
}

function refreshTagFilterItems() {
  const tagList = getTagList();

  $("#tagFilterItems").empty();

  for (let i = 0; i < tagList.length; i++) {
    const html = `
    <div class="tag-badge filter-tag" data-tag="${tagList[i]}">${tagList[i]}</div>
    `;
    $("#tagFilterItems").append(html);
  }
}

function refreshTagEditorItems(associatedTags = []) {
  const tagList = getTagList();

  $("#tagEditorItems").empty();

  for (let i = 0; i < tagList.length; i++) {
    const isActive = associatedTags.includes(tagList[i]);
    let className = "tag-badge editor-tag";
    if (isActive) {
      className += " active";
    }
    const html = `
    <div class="${className}" data-tag="${tagList[i]}">${tagList[i]}</div>
    `;
    $("#tagEditorItems").append(html);
  }
}

//----Add Tags----//
$("#addTag").on("click", function () {
  const raw = $("#inputTag").val();
  const tag = raw.trim().toLowerCase();
  if (tag == "") {
    alert("Enter the tag name you want to add.");
    return;
  }
  const list = getTagList();
  if (list.includes(tag)) {
    alert("Already exists!");
    return;
  }
  list.push(tag);
  saveTagList(list);
  $("#inputTag").val("");
  refreshTagFilterItems();
  refreshTagEditorItems([]);
  alert("Added tag!");
});

//----Active Select Tags----//
$(document).on("click", ".filter-tag", function (e) {
  e.stopPropagation();
  $(this).toggleClass("active");
  refreshSnippetList();
});

$(document).on("click", ".editor-tag", function (e) {
  e.stopPropagation();

  const key = $("#codename").val();
  if (key === "") {
    return;
  }

  $(this).toggleClass("active");

  let activeTags = [];
  $(".editor-tag.active").each(function () {
    activeTags.push($(this).data("tag"));
  });

  const raw = localStorage.getItem(key);
  const obj = JSON.parse(raw);

  obj.tags = activeTags;

  localStorage.setItem(key, JSON.stringify(obj));
});

function getSelectedTags() {
  const arr = [];
  $(".filter-tag.active").each(function () {
    const name = $(this).data("tag");
    arr.push(name);
  });
  return arr;
}

//----Delete Tags----//
function deleteSelectedTag() {
  const selected = getSelectedTags();

  if (selected.length === 0) {
    return;
  }

  if (
    !confirm(
      "Are you sure you want to delete the selected tags? The tags will also be deleted from your saved snippets."
    )
  ) {
    return;
  }

  let list = getTagList();
  list = list.filter((tag) => !selected.includes(tag));
  saveTagList(list);

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const raw = localStorage.getItem(key);
    const obj = JSON.parse(raw);

    if (!obj.tags) continue;

    obj.tags = obj.tags.filter((tag) => !selected.includes(tag));
    localStorage.setItem(key, JSON.stringify(obj));
  }

  refreshTagFilterItems();
  refreshTagEditorItems([]);
  refreshSnippetList();
}

$("#deleteTag").on("click", function () {
  deleteSelectedTag();
});
