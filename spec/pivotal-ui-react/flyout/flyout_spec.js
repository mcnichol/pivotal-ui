import '../spec_helper';
import {Flyout} from '../../../src/react/flyout';
import {Icon} from '../../../src/react/iconography';
import {Dialog} from '../../../src/react/dialogs';

fdescribe('Flyout', () => {
  let onHide, children, header, subject;

  beforeEach(() => {
    spyOnRender(Dialog).and.callThrough();
    spyOnRender(Icon);

    onHide = jasmine.createSpy('onHide');
    children = (<div>some-flyout-body</div>);
    header = (<div>some-flyout-header</div>);
    subject = ReactDOM.render((
      <Flyout {...{
        animationDuration: 0,
        animationEasing: 'linear',
        children,
        className: 'some-backdrop-class',
        dialogClassName: 'some-dialog-class',
        header,
        iconSrc: 'chevron_left',
        onHide,
        show: true
      }}/>
    ), root);
  });

  it('renders a Dialog', () => {
    expect(Dialog).toHaveBeenRenderedWithProps({
      show: true,
      onHide,
      animationDuration: 0,
      animationEasing: 'linear',
      className: 'some-backdrop-class',
      dialogClassName: 'some-dialog-class pui-flyout-dialog',
      children: jasmine.any(Object),
      hideOnBackdropClick: false,
      hideOnEscKeyDown: false
    });
  });

  it('renders an icon button', () => {
    expect('.pui-dialog .pui-flyout-icon-btn').toHaveClass('pui-btn-default-flat');
    expect('.pui-dialog .pui-flyout-icon-btn').toHaveClass('pui-btn-icon');
    expect(Icon).toHaveBeenRenderedWithProps({src: 'chevron_left', size: 'inherit', style: {}, verticalAlign: 'middle'});
  });

  it('renders the children', () => {
    expect('.pui-dialog pui-flyout-header').toExist();
    expect('.pui-dialog pui-flyout-header').toExist();
    expect('.pui-dialog .pui-modal-body a').toExist();
  });

  describe('bodyClassName', () => {
    beforeEach(() => {
      subject::setProps({bodyClassName: 'some-class-name'});
    });

    it('sets the given className on the body', () => {
      expect('.flyout-body').toHaveClass('some-class-name');
    });
  });

  it('renders the children', () => {
    expect('.flyout .flyout-body').toHaveText('some-flyout-body');
  });

  describe('open prop', () => {
    beforeEach(() => {
      subject::setProps({open: true});
    });

    it('renders the flyout with the flyout-open class', () => {
      expect('.flyout').toHaveClass('flyout-open');
    });
  });

  describe('width prop (px)', () => {
    beforeEach(() => {
      subject::setProps({width: '100px'});
    });

    it('renders the flyout with the given width', () => {
      expect('.flyout .flyout-content').toHaveAttr('style', 'width: 100px; right: -80px;');
    });
  });

  describe('width prop (%)', () => {
    beforeEach(() => {
      subject::setProps({width: '50%'});
    });

    it('renders the flyout with the given width', () => {
      expect('.flyout .flyout-content').toHaveAttr('style', 'width: 50%; right: -40%;');
    });
  });

  describe('scrim', () => {
    beforeEach(() => {
      $('.flyout').simulate('click');
    });

    describe('clicking the scrim', () => {
      it('does not close the flyout', () => {
        expect(close).not.toHaveBeenCalled();
      });
    });
  });

  describe('header', () => {
    describe('with a headerClassName prop', () => {
      beforeEach(() => {
        subject::setProps({headerClassName: 'pan'});
      });

      it('sets the given className on the header', () => {
        expect('.flyout-header').toHaveClass('pan');
      });
    });

    it('renders a close button', () => {
      expect('.flyout-header.grid > .col.col-fixed .pui-btn.pui-btn-default-flat.pui-btn-icon .icon.icon-middle .icon-close').toHaveText('');
    });

    describe('when clicking the close button', () => {
      beforeEach(() => {
        $('.flyout-close').simulate('click');
      });

      it('calls the close callback', () => {
        expect(close).toHaveBeenCalledWith();
      });
    });

    it('renders a header', () => {
      expect('.flyout-header .col:eq(1)').toHaveText('some-flyout-header');
    });

    describe('when an icon src is provided', () => {
      let iconSrc;
      beforeEach(() => {
        iconSrc = 'arrow_back';
        subject::setProps({iconSrc});
      });

      it('renders that icon instead of the close icon', () => {
        expect(`.flyout-header.grid > .col.col-fixed .pui-btn.pui-btn-default-flat.pui-btn-icon .icon.icon-middle .icon-${iconSrc}`).toHaveText('');
      });
    });
  });

  describe('when unmounting', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('calls the close callback', () => {
      expect(close).toHaveBeenCalledWith();
    });
  });
});


/*
  describe('when the backdrop is clicked', () => {
    beforeEach(() => {
      onHide.calls.reset();
      $('.pui-dialog-backdrop').simulate('click');
    });

    it('calls the onHide prop', () => {
      expect(onHide).not.toHaveBeenCalled();
    });
  });

  describe('when esc is pressed', () => {
    beforeEach(() => {
      onHide.calls.reset();
      const escEvent = new KeyboardEvent('keydown', {keyCode: Dialog.ESC_KEY, bubbles: true});
      document.documentElement.dispatchEvent(escEvent);
    });

    it('calls the onHide prop', () => {
      expect(onHide).not.toHaveBeenCalled();
    });
  });
 */