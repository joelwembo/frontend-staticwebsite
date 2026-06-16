// VxStudio Visual Edit Bridge — auto-injected, safe to delete

(function() {
  if (window.__vaVisualEditBridge) return;
  window.__vaVisualEditBridge = true;

  var SKIP_TAGS = { HTML:1, HEAD:1, BODY:1, SCRIPT:1, STYLE:1, LINK:1, META:1, NOSCRIPT:1 };
  var selectedEl = null;
  var enabled = false;
  var highlightOverlay = null;
  var selectOverlay = null;
  var tagLabel = null;
  var selectLabel = null;
  var hintLabel = null;

  // ── Create overlay elements ────────────────────────────────────────────
  function createOverlays() {
    if (highlightOverlay) return;

    highlightOverlay = document.createElement('div');
    highlightOverlay.id = '__va-hover-overlay';
    highlightOverlay.style.cssText = 'position:fixed;pointer-events:none;border:2px solid rgba(96,165,250,0.6);border-radius:2px;z-index:999998;display:none;transition:all 75ms ease;';
    document.body.appendChild(highlightOverlay);

    tagLabel = document.createElement('div');
    tagLabel.style.cssText = 'position:absolute;top:-20px;left:0;padding:1px 6px;background:rgba(96,165,250,0.8);color:#fff;font-size:9px;font-family:monospace;border-radius:2px;white-space:nowrap;';
    highlightOverlay.appendChild(tagLabel);

    selectOverlay = document.createElement('div');
    selectOverlay.id = '__va-select-overlay';
    selectOverlay.style.cssText = 'position:fixed;pointer-events:none;border:2px solid #3b82f6;border-radius:2px;z-index:999999;display:none;box-shadow:0 0 0 1px rgba(59,130,246,0.3),0 0 12px rgba(59,130,246,0.15);';
    document.body.appendChild(selectOverlay);

    selectLabel = document.createElement('div');
    selectLabel.style.cssText = 'position:absolute;top:-20px;left:0;padding:1px 6px;background:#2563eb;color:#fff;font-size:9px;font-family:monospace;font-weight:600;border-radius:2px;white-space:nowrap;';
    selectOverlay.appendChild(selectLabel);

    hintLabel = document.createElement('div');
    hintLabel.style.cssText = 'position:absolute;bottom:-18px;left:0;padding:1px 6px;background:rgba(0,0,0,0.6);color:rgba(255,255,255,0.7);font-size:8px;border-radius:2px;white-space:nowrap;';
    hintLabel.textContent = 'double-click to edit text';
    selectOverlay.appendChild(hintLabel);
  }

  function getElementInfo(el) {
    var rect = el.getBoundingClientRect();
    var cs = window.getComputedStyle(el);
    return {
      tagName: el.tagName.toLowerCase(),
      textContent: (el.textContent || '').trim().slice(0, 120),
      rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      computedStyles: {
        fontSize: cs.fontSize || '',
        fontWeight: cs.fontWeight || '',
        fontFamily: cs.fontFamily || '',
        color: cs.color || '',
        backgroundColor: cs.backgroundColor || '',
        textAlign: cs.textAlign || '',
        marginTop: cs.marginTop || '',
        marginRight: cs.marginRight || '',
        marginBottom: cs.marginBottom || '',
        marginLeft: cs.marginLeft || '',
        paddingTop: cs.paddingTop || '',
        paddingRight: cs.paddingRight || '',
        paddingBottom: cs.paddingBottom || '',
        paddingLeft: cs.paddingLeft || '',
        borderRadius: cs.borderRadius || '',
        lineHeight: cs.lineHeight || '',
        letterSpacing: cs.letterSpacing || ''
      },
      hasChildren: el.children.length > 0,
      xpath: getSimpleXPath(el)
    };
  }

  function getSimpleXPath(el) {
    var parts = [];
    while (el && el.nodeType === 1) {
      var idx = 1;
      var sib = el.previousElementSibling;
      while (sib) { if (sib.tagName === el.tagName) idx++; sib = sib.previousElementSibling; }
      parts.unshift(el.tagName.toLowerCase() + '[' + idx + ']');
      el = el.parentElement;
    }
    return '/' + parts.join('/');
  }

  function positionOverlay(overlay, rect) {
    overlay.style.top = rect.top + 'px';
    overlay.style.left = rect.left + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.height = rect.height + 'px';
    overlay.style.display = 'block';
  }

  // ── Event handlers ─────────────────────────────────────────────────────
  function onMouseMove(e) {
    if (!enabled) return;
    var el = e.target;
    if (!el || SKIP_TAGS[el.tagName] || el.id === '__va-hover-overlay' || el.id === '__va-select-overlay') {
      if (highlightOverlay) highlightOverlay.style.display = 'none';
      return;
    }
    createOverlays();
    var rect = el.getBoundingClientRect();
    positionOverlay(highlightOverlay, rect);
    tagLabel.textContent = el.tagName.toLowerCase();

    // Also send to parent
    window.parent.postMessage({
      type: '__va_visual_edit',
      event: 'hover',
      data: getElementInfo(el)
    }, '*');
  }

  function onClick(e) {
    if (!enabled) return;
    var el = e.target;
    if (!el || SKIP_TAGS[el.tagName] || el.id === '__va-hover-overlay' || el.id === '__va-select-overlay') return;
    e.preventDefault();
    e.stopPropagation();

    selectedEl = el;
    createOverlays();
    var rect = el.getBoundingClientRect();
    positionOverlay(selectOverlay, rect);
    selectLabel.textContent = el.tagName.toLowerCase();
    hintLabel.style.display = (!el.children.length && el.textContent.trim()) ? 'block' : 'none';

    window.parent.postMessage({
      type: '__va_visual_edit',
      event: 'select',
      data: getElementInfo(el)
    }, '*');
  }

  function onDblClick(e) {
    if (!enabled) return;
    var el = e.target;
    if (!el || SKIP_TAGS[el.tagName]) return;
    if (el.children.length > 0 || !el.textContent.trim()) return;
    e.preventDefault();
    e.stopPropagation();

    var originalText = el.textContent;
    el.contentEditable = 'true';
    el.focus();
    el.style.outline = '2px solid #3b82f6';
    el.style.outlineOffset = '2px';

    // Select all text
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    if (selectLabel) selectLabel.textContent = el.tagName.toLowerCase() + ' (editing)';

    function finish() {
      el.contentEditable = 'false';
      el.style.outline = '';
      el.style.outlineOffset = '';
      if (selectLabel) selectLabel.textContent = el.tagName.toLowerCase();
      var newText = (el.textContent || '').trim();
      if (newText !== originalText.trim()) {
        window.parent.postMessage({
          type: '__va_visual_edit',
          event: 'textChanged',
          data: { newText: newText, originalText: originalText.trim(), tagName: el.tagName.toLowerCase() }
        }, '*');
      }
      el.removeEventListener('blur', finish);
      el.removeEventListener('keydown', onKey);
    }

    function onKey(ke) {
      if (ke.key === 'Enter' && !ke.shiftKey) { ke.preventDefault(); el.blur(); }
      if (ke.key === 'Escape') { el.textContent = originalText; el.blur(); }
    }

    el.addEventListener('blur', finish);
    el.addEventListener('keydown', onKey);
  }

  function onMouseLeave() {
    if (highlightOverlay) highlightOverlay.style.display = 'none';
    window.parent.postMessage({ type: '__va_visual_edit', event: 'hoverEnd' }, '*');
  }

  // ── Listen for commands from parent ────────────────────────────────────
  window.addEventListener('message', function(e) {
    var msg = e.data;
    if (!msg || msg.type !== '__va_visual_edit_cmd') return;

    if (msg.cmd === 'enable') {
      enabled = true;
      createOverlays();
      document.body.style.cursor = 'crosshair';
    }
    if (msg.cmd === 'disable') {
      enabled = false;
      if (highlightOverlay) highlightOverlay.style.display = 'none';
      if (selectOverlay) selectOverlay.style.display = 'none';
      document.body.style.cursor = '';
      selectedEl = null;
    }
    if (msg.cmd === 'applyStyle' && selectedEl) {
      try {
        selectedEl.style[msg.property] = msg.value;
        // Update the selection overlay position (element may have resized)
        var rect = selectedEl.getBoundingClientRect();
        positionOverlay(selectOverlay, rect);
        // Send back updated info
        window.parent.postMessage({
          type: '__va_visual_edit',
          event: 'styleApplied',
          data: getElementInfo(selectedEl)
        }, '*');
      } catch(err) { console.warn('[VA Bridge] Style apply failed:', err); }
    }
    if (msg.cmd === 'applyText' && selectedEl) {
      try {
        if (selectedEl.children.length === 0) {
          selectedEl.textContent = msg.value;
        } else {
          var nodes = selectedEl.childNodes;
          for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeType === 3 && nodes[i].textContent.trim()) {
              nodes[i].textContent = msg.value;
              break;
            }
          }
        }
        window.parent.postMessage({
          type: '__va_visual_edit',
          event: 'textApplied',
          data: getElementInfo(selectedEl)
        }, '*');
      } catch(err) { console.warn('[VA Bridge] Text apply failed:', err); }
    }
    if (msg.cmd === 'selectByXPath' && msg.xpath) {
      try {
        var result = document.evaluate(msg.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (result.singleNodeValue) {
          selectedEl = result.singleNodeValue;
          var rect = selectedEl.getBoundingClientRect();
          createOverlays();
          positionOverlay(selectOverlay, rect);
          selectLabel.textContent = selectedEl.tagName.toLowerCase();
        }
      } catch(err) {}
    }
    if (msg.cmd === 'ping') {
      window.parent.postMessage({ type: '__va_visual_edit', event: 'pong' }, '*');
    }
  });

  // ── Attach event listeners ─────────────────────────────────────────────
  document.addEventListener('mousemove', onMouseMove, true);
  document.addEventListener('click', onClick, true);
  document.addEventListener('dblclick', onDblClick, true);
  document.addEventListener('mouseleave', onMouseLeave);

  // Periodically update selection overlay position (handles scroll/resize)
  setInterval(function() {
    if (selectedEl && selectOverlay && selectOverlay.style.display !== 'none') {
      if (!selectedEl.isConnected) {
        selectOverlay.style.display = 'none';
        selectedEl = null;
        return;
      }
      var rect = selectedEl.getBoundingClientRect();
      positionOverlay(selectOverlay, rect);
    }
  }, 200);

  // Tell parent we're ready
  window.parent.postMessage({ type: '__va_visual_edit', event: 'bridgeReady' }, '*');
  console.log('[VA Visual Edit Bridge] Initialized');
})();
