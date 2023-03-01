/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 该文件由脚本自动生成，如需修改请联系 PMC
 * This file generated by scripts of tdesign-api. `npm run api:docs Image React(PC) vitest,finalProject`
 * If you need to modify this file, contact PMC first please.
 */
import React from 'react';
import { fireEvent, vi, render, mockDelay, simulateImageEvent } from '@test/utils';
import { Image } from '..';
import { getOverlayImageMount } from './mount';

describe('Image Component', () => {
  it('props.alt works fine', () => {
    const wrapper = render(<Image alt={'text image load failed'} src={'https://www.error.img.com'}></Image>);
    const container = wrapper.container.querySelector('img');
    expect(container.getAttribute('alt')).toBe('text image load failed');
  });

  it('props.error works fine', () => {
    const { container } = render(
      <Image error={<span className="custom-node">TNode</span>} src={'https://this.is.an.error.img.com'}></Image>,
    );
    const imgDom = container.querySelector('img');
    simulateImageEvent(imgDom, 'error');
    expect(container.querySelector('.custom-node')).toBeTruthy();
  });

  ['contain', 'cover', 'fill', 'none', 'scale-down'].forEach((item) => {
    it(`props.fit is equal to ${item}`, () => {
      const wrapper = render(<Image fit={item}></Image>);
      const container = wrapper.container.querySelector('.t-image');
      expect(container).toHaveClass(`t-image--fit-${item}`);
      expect(container).toMatchSnapshot();
    });
  });

  it('props.gallery works fine', () => {
    // gallery default value is false
    const { container: container1 } = render(<Image></Image>);
    expect(container1.querySelector(`.${'t-image__wrapper--gallery'}`)).toBeFalsy();
    // gallery = true
    const { container: container2 } = render(<Image gallery={true}></Image>);
    expect(container2.firstChild).toHaveClass('t-image__wrapper--gallery');
    // gallery = false
    const { container: container3 } = render(<Image gallery={false}></Image>);
    expect(container3.querySelector(`.${'t-image__wrapper--gallery'}`)).toBeFalsy();
  });

  it('props.gallery works fine. `".t-image__gallery-shadow"` should exist', () => {
    const { container } = render(<Image gallery={true}></Image>);
    expect(container.querySelector('.t-image__gallery-shadow')).toBeTruthy();
  });

  it('props.loading works fine', () => {
    const { container } = render(<Image loading={<span className="custom-node">TNode</span>}></Image>);
    expect(container.querySelector('.custom-node')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('props.overlayContent works fine', () => {
    const { container } = render(<Image overlayContent={<span className="custom-node">TNode</span>}></Image>);
    expect(container.querySelector('.custom-node')).toBeTruthy();
    expect(container.querySelector('.t-image__overlay-content')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('props.overlayTrigger: show overlay content on hover', async () => {
    const { container } = getOverlayImageMount(Image, {
      overlayTrigger: 'hover',
      src: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    });
    fireEvent.mouseEnter(container.querySelector('.t-image__wrapper'));
    await mockDelay();
    expect(container.querySelector('.t-image__overlay-content')).toBeTruthy();
    expect(container.querySelector('.t-image__overlay-content--hidden')).toBeFalsy();
    fireEvent.mouseLeave(container.querySelector('.t-image__wrapper'));
    await mockDelay();
    expect(container.querySelector('.t-image__overlay-content--hidden')).toBeTruthy();
  });

  it('props.placeholder works fine', () => {
    const { container } = render(<Image placeholder={<span className="custom-node">TNode</span>}></Image>);
    expect(container.querySelector('.custom-node')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  const positionClassNameMap = {
    top: 't-image--position-top',
    bottom: 't-image--position-bottom',
    left: 't-image--position-left',
    right: 't-image--position-right',
    center: 't-image--position-center',
  };
  Object.entries(positionClassNameMap).forEach(([enumValue, expectedClassName]) => {
    it(`props.position is equal to ${enumValue}`, () => {
      let propValue = { true: true, false: false }[enumValue];
      propValue = propValue === undefined ? enumValue : propValue;
      const wrapper = render(<Image position={propValue}></Image>);
      const container = wrapper.container.querySelector('.t-image');
      expect(container).toHaveClass(expectedClassName);
    });
  });

  ['circle', 'round', 'square'].forEach((item) => {
    it(`props.shape is equal to ${item}`, () => {
      const wrapper = render(<Image shape={item}></Image>);
      const container = wrapper.container.querySelector('.t-image__wrapper');
      expect(container).toHaveClass(`t-image__wrapper--shape-${item}`);
    });
  });

  it(`props.srcset is equal to {'image/avif': 'https://tdesign.gtimg.com/img/tdesign-image.avif','image/webp': 'https://tdesign.gtimg.com/img/tdesign-image.webp'}`, () => {
    const { container } = render(
      <Image
        srcset={{
          'image/avif': 'https://tdesign.gtimg.com/img/tdesign-image.avif',
          'image/webp': 'https://tdesign.gtimg.com/img/tdesign-image.webp',
        }}
      ></Image>,
    );
    const domWrapper = container.querySelector('picture > source');
    expect(domWrapper.getAttribute('srcset')).toBe('https://tdesign.gtimg.com/img/tdesign-image.avif');
    const domWrapper1 = container.querySelector('picture > source:nth-child(2)');
    expect(domWrapper1.getAttribute('srcset')).toBe('https://tdesign.gtimg.com/img/tdesign-image.webp');
  });

  it('events.error works fine', () => {
    const onErrorFn = vi.fn();
    const { container } = render(<Image src={'https://load-failed-img.png'} onError={onErrorFn}></Image>);
    const imgDom = container.querySelector('img');
    simulateImageEvent(imgDom, 'error');
    expect(container.querySelector('.t-image__error')).toBeTruthy();
    expect(container.querySelector('.t-icon-image-error')).toBeTruthy();
    expect(onErrorFn).toHaveBeenCalled();
    expect(onErrorFn.mock.calls[0][0].e.type).toBe('error');
  });

  it('events.load works fine', () => {
    const onLoadFn1 = vi.fn();
    const { container } = render(
      <Image src={'https://tdesign.gtimg.com/demo/demo-image-1.png'} onLoad={onLoadFn1}></Image>,
    );

    const imgDom1 = container.querySelector('img');
    simulateImageEvent(imgDom1, 'load');
    expect(onLoadFn1).toHaveBeenCalled();
    expect(onLoadFn1.mock.calls[0][0].e.type).toBe('load');
  });
});
