import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  boardMarkerClassFor,
  boardMapRouteActionsMarkup,
  boardRouteActionModel,
  createBoardMapMarker,
  createBoardMapController,
  createBoardMapPopupRenderer,
} from './board-map-controller.js';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('board map controller', () => {
  it('creates and binds one shared board marker lifecycle', () => {
    const listeners = new Map<string, () => void>();
    const markerNode = {
      dataset: {} as Record<string, string>,
      type: '',
      className: '',
      innerHTML: '',
      attributes: new Map<string, string>(),
      setAttribute(name: string, value: string) {
        this.attributes.set(name, value);
      },
      addEventListener(name: string, listener: () => void) {
        listeners.set(name, listener);
      },
    };
    const popup = {
      html: '',
      setHTML(html: string) {
        this.html = html;
        return this;
      },
    };
    const marker = {
      point: null as unknown,
      popup: null as unknown,
      map: null as unknown,
      setLngLat(point: unknown) {
        this.point = point;
        return this;
      },
      setPopup(nextPopup: unknown) {
        this.popup = nextPopup;
        return this;
      },
      addTo(map: unknown) {
        this.map = map;
        return this;
      },
    };
    const maplibregl = {
      Marker: class {
        constructor() {
          return marker;
        }
      },
      Popup: class {
        constructor() {
          return popup;
        }
      },
    };
    const mapRuntime = {};
    const bindPopup = vi.fn();
    const onSelectedChange = vi.fn();
    const onClick = vi.fn();
    const item = { key: 'rum', cardRoute: { river: { name: 'Rum River' } } };

    expect(createBoardMapMarker({
      maplibregl,
      mapRuntime,
      item,
      point: { longitude: -93, latitude: 45 },
      markerClassFor: () => 'score-marker',
      markerLabel: () => '87 <',
      markerAriaLabel: () => 'Rum River, score 87',
      popupMarkup: () => '<article>Rum River</article>',
      includeDataKey: true,
      onSelectedChange,
      onClick,
      documentObject: { createElement: () => markerNode },
      bindPopup,
    })).toBe(marker);

    expect(markerNode).toMatchObject({
      type: 'button',
      className: 'score-marker',
      innerHTML: '<span>87 &lt;</span>',
      dataset: { summaryMapMarker: 'rum' },
    });
    expect(markerNode.attributes.get('aria-label')).toBe('Rum River, score 87');
    expect(marker).toMatchObject({
      point: [-93, 45],
      popup,
      map: mapRuntime,
    });
    expect(popup.html).toBe('<article>Rum River</article>');
    expect(bindPopup).toHaveBeenCalledWith(
      marker,
      markerNode,
      expect.objectContaining({ map: mapRuntime }),
    );

    bindPopup.mock.calls[0][2].onSelectedChange(true);
    expect(onSelectedChange).toHaveBeenCalledWith(true, item, marker);
    listeners.get('click')?.();
    expect(onClick).toHaveBeenCalledWith(item, marker);
  });

  it('owns shared marker classes and popup markup', () => {
    const item = {
      key: 'rum',
      kind: 'route',
      link: '/rivers/rum/',
      cardRoute: {
        rating: 'Strong',
        score: 87,
        confidence: { label: 'High' },
        river: {
          slug: 'rum',
          name: 'Rum <River>',
          distanceLabel: '11.75 mi',
          difficulty: 'easy',
        },
      },
    };
    const popupMarkup = createBoardMapPopupRenderer({
      isNearbyReady: () => true,
      getLatestResults: () => [item],
      representativeRouteLabel: () => 'Two routes',
      routeLabelForItem: () => 'Wayside <to> Milaca',
      mapMarkerLabel: () => '87',
      mapMarkerContext: () => 'Strong today',
    });

    expect(boardMarkerClassFor(item)).toContain('score-map-marker');
    expect(popupMarkup(item)).toContain('Rum &lt;River&gt;');
    expect(popupMarkup(item)).toContain('Wayside &lt;to&gt; Milaca');
    expect(popupMarkup(item)).toContain('11.75 mi on-water');
    expect(popupMarkup(item)).toContain('Easy difficulty');
    expect(popupMarkup(item)).toContain('Strong today');
    expect(popupMarkup(item)).toContain('/rivers/rum/');
  });

  it('offers a specific route and river comparison for grouped results', () => {
    const item = {
      kind: 'group',
      link: '/rivers/by-river/rum-river/',
      totalRouteCount: 3,
      cardRoute: {
        river: {
          slug: 'rum-river-milaca-andover',
        },
      },
    };

    expect(boardRouteActionModel(item, { routeLabel: 'View best route' })).toEqual({
      route: {
        href: '/rivers/rum-river-milaca-andover/',
        label: 'View best route',
      },
      compare: {
        href: '/rivers/by-river/rum-river/',
        label: 'Compare 3 routes',
      },
    });

    const markup = boardMapRouteActionsMarkup(item);
    expect(markup).toContain('View route');
    expect(markup).toContain('/rivers/rum-river-milaca-andover/');
    expect(markup).toContain('Compare 3 routes');
    expect(markup).toContain('/rivers/by-river/rum-river/');
  });

  it('owns mobile list/map state and collapse presentation', () => {
    let view = 'list';
    let phone = true;
    const controller = createBoardMapController({
      supportsMobileViews: true,
      isPhone: () => phone,
      getMobileView: () => view,
      setMobileView: (next: string) => {
        view = next;
      },
    });

    expect(controller.activeView()).toBe('list');
    expect(controller.presentation()).toMatchObject({
      mobileView: 'list',
      mobileListActive: true,
      showMobileSwitch: true,
    });

    expect(controller.setView('map')).toBe('map');
    expect(controller.presentation()).toMatchObject({
      mobileMapActive: true,
      showMobileBackButton: true,
    });

    phone = false;
    expect(controller.activeView()).toBe('map');
    expect(controller.presentation()).toMatchObject({
      showMobileSwitch: false,
      mobileMapActive: false,
    });
  });

  it('models collapsed maps when list/map switching is not enabled', () => {
    const controller = createBoardMapController({
      supportsMobileViews: false,
      isPhone: () => true,
      getMobileView: () => 'map',
      setMobileView: vi.fn(),
    });

    expect(controller.setView('list')).toBeNull();
    expect(controller.presentation(true)).toMatchObject({
      showCollapseToggle: true,
      collapsedMap: true,
      toggleExpanded: false,
      toggleLabel: 'Show map',
    });
  });

  it('closes every open popup except the selected marker', () => {
    const selectedRemove = vi.fn();
    const otherRemove = vi.fn();
    const controller = createBoardMapController({
      supportsMobileViews: false,
      isPhone: () => false,
      getMobileView: () => 'map',
      setMobileView: vi.fn(),
    });
    const markers = new Map([
      ['selected', { getPopup: () => ({ isOpen: () => true, remove: selectedRemove }) }],
      ['other', { getPopup: () => ({ isOpen: () => true, remove: otherRemove }) }],
      ['closed', { getPopup: () => ({ isOpen: () => false, remove: vi.fn() }) }],
    ]);

    controller.closePopups(markers, 'selected');

    expect(selectedRemove).not.toHaveBeenCalled();
    expect(otherRemove).toHaveBeenCalledOnce();
  });

  it('builds item and grouped-route result contexts with selection prompts', () => {
    let view = 'map';
    const controller = createBoardMapController({
      supportsMobileViews: true,
      isPhone: () => true,
      getMobileView: () => view,
      setMobileView: (next: string) => {
        view = next;
      },
    });
    const items = [
      {
        key: 'rum',
        matchingRouteCount: 2,
        cardRoute: { river: { riverId: 'rum', name: 'Rum River' } },
      },
      {
        key: 'snake',
        matchingRouteCount: 1,
        cardRoute: { river: { riverId: 'snake', name: 'Snake River' } },
      },
    ];

    expect(controller.resultsContext(items, {
      selectedKey: 'rum',
      itemNounSingular: 'result',
      itemNounPlural: 'results',
    })).toMatchObject({
      countValue: '2',
      countLabel: '2 results on the map',
      availabilityLabel: '2 available',
      noteText: '2 results on the map. Rum River is selected below.',
      routeCount: 3,
      riverCount: 2,
    });

    view = 'list';
    expect(controller.resultsContext(items, { countMode: 'routes' })).toMatchObject({
      countValue: '3',
      countLabel: '3 matching routes across 2 rivers',
      availabilityLabel: '3 routes across 2 rivers available',
      noteText: '3 matching routes across 2 rivers',
    });
    expect(controller.resultsContext([], { emptyText: 'Nothing here.' })).toMatchObject({
      hasItems: false,
      noteText: 'Nothing here.',
      availabilityLabel: '',
    });
    expect(controller.resolveSelection(items, 'rum')).toBe('rum');
    expect(controller.resolveSelection(items, 'missing')).toBeNull();
    expect(controller.resolveSelection(items, 'missing', { fallback: 'first' })).toBe('rum');
  });

  it('synchronizes result titles, notes, counts, and switch accessibility', () => {
    class FakeElement {
      dataset: Record<string, string> = {};
      textContent = '';
      hidden = false;
      innerHTML = '';
    }
    class FakeButton extends FakeElement {
      attributes = new Map<string, string>();
      setAttribute(name: string, value: string) {
        this.attributes.set(name, value);
      }
    }
    vi.stubGlobal('HTMLElement', FakeElement);
    vi.stubGlobal('HTMLButtonElement', FakeButton);

    const shell = new FakeElement();
    const title = new FakeElement();
    title.dataset.defaultLabel = 'Ranked results';
    title.dataset.mobileMapLabel = 'Map results';
    const note = new FakeElement();
    const count = new FakeElement();
    const mapButton = new FakeButton();
    mapButton.dataset.summaryMapMobileView = 'map';
    const resultsContainer = new FakeElement();
    const items = [{
      key: 'rum',
      cardRoute: { river: { riverId: 'rum', name: 'Rum River' } },
    }];
    const controller = createBoardMapController({
      supportsMobileViews: true,
      isPhone: () => true,
      getMobileView: () => 'map',
      setMobileView: vi.fn(),
      getItems: () => items,
      getSelectedKey: () => 'rum',
      elements: {
        shell,
        resultsTitle: title,
        resultsNote: note,
        countNodes: [count],
        viewButtons: [mapButton],
      },
      resultsRenderer: {
        container: resultsContainer,
        setItems: vi.fn(),
        markerClassFor: vi.fn(),
        mapMarkerLabel: vi.fn(),
        routeLabelForItem: vi.fn(),
        mapMarkerContext: vi.fn(),
        getEmptyText: () => 'No mapped results.',
        onOpen: vi.fn(),
        onSelection: vi.fn(),
      },
    });

    controller.updateResultsContext();

    expect(shell.dataset.summaryMapActiveMobile).toBe('map');
    expect(title.textContent).toBe('Map results');
    expect(note.textContent).toBe('1 result on the map. Rum River is selected below.');
    expect(count.textContent).toBe('1');
    expect(count.hidden).toBe(false);
    expect(mapButton.attributes.get('aria-label')).toBe('Show map view (1 available)');
    expect(controller.renderResults([])).toBeNull();
    expect(resultsContainer.innerHTML).toContain('No mapped results.');
  });

  it('synchronizes mobile view classes, controls, and map resizing', () => {
    vi.useFakeTimers();
    class FakeClassList {
      values = new Set<string>();
      toggle(name: string, enabled: boolean) {
        if (enabled) this.values.add(name);
        else this.values.delete(name);
      }
    }
    class FakeElement {
      dataset: Record<string, string> = {};
      textContent = '';
      hidden = false;
      classList = new FakeClassList();
      scrollIntoView = vi.fn();
    }
    class FakeButton extends FakeElement {
      attributes = new Map<string, string>();
      setAttribute(name: string, value: string) {
        this.attributes.set(name, value);
      }
    }
    vi.stubGlobal('HTMLElement', FakeElement);
    vi.stubGlobal('HTMLButtonElement', FakeButton);
    vi.stubGlobal('window', { setTimeout });

    let view = 'map';
    const shell = new FakeElement();
    const toggle = new FakeButton();
    const mobileSwitch = new FakeElement();
    const back = new FakeButton();
    const mapButton = new FakeButton();
    mapButton.dataset.summaryMapMobileView = 'map';
    const listButton = new FakeButton();
    listButton.dataset.summaryMapMobileView = 'list';
    const resize = vi.fn();
    const controller = createBoardMapController({
      supportsMobileViews: true,
      isPhone: () => true,
      getMobileView: () => view,
      setMobileView: (next: string) => {
        view = next;
      },
      getMapRuntime: () => ({ resize }),
      elements: {
        shell,
        toggle,
        mobileSwitch,
        mobileBackButton: back,
        viewButtons: [mapButton, listButton],
      },
    });

    controller.updateView();
    vi.runAllTimers();

    expect(shell.classList.values).toContain('summary-map-shell--mobile-map');
    expect(mobileSwitch.hidden).toBe(false);
    expect(back.hidden).toBe(false);
    expect(toggle.hidden).toBe(true);
    expect(mapButton.attributes.get('aria-pressed')).toBe('true');
    expect(listButton.attributes.get('aria-pressed')).toBe('false');
    expect(resize).toHaveBeenCalledOnce();

    controller.setViewAndSync('list');
    expect(view).toBe('list');
    expect(shell.classList.values).toContain('summary-map-shell--mobile-list');
  });
});
