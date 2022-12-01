import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { TimelineMax, gsap, Bounce, Circ } from 'gsap';
import DrawSVGPlugin from '~app/components/Validator/components/DrawSVGPlugin'
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import DvfNetwork from '~lib/api/DvfNetwork';
// import Banner from '~app/common/components/Banner';
import Status from '~app/common/components/Status';
import Layout from '~app/common/components/Layout';
import BaseStore from '~app/common/stores/BaseStore';
import { longStringShorten } from '~lib/utils/strings';
import { Heading } from '~app/common/components/Headings';
// import { Incentivized } from '~app/common/components/Incentivized';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
import PerformanceStore from '~app/common/stores/Performance.store';
import ContentContainer from '~app/common/components/ContentContainer';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';
import BeaconchaLink from '~app/common/components/BeaconchaLink/BeaconchaLink';
import ValidatorDuties from '~app/components/Validator/components/ValidatorDuties';
import ValidatorOperators from '~app/components/Validator/components/ValidatorOperators';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

gsap.registerPlugin(DrawSVGPlugin);

const StatsBlock = styled.div<({ maxWidth?: any }) >`
  max-width: ${({ maxWidth }) => `${Number.isNaN(maxWidth ?? 200) ? (maxWidth) : `${(maxWidth ?? 200)}px`}`};
`;

const BreadCrumbs = ({ address }: { address: string }) => {
  return (
    <BreadCrumbsContainer>
      <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
      <BreadCrumbDivider />
      <BreadCrumb href={config.routes.VALIDATORS.HOME}>validators</BreadCrumb>
      <BreadCrumbDivider />
      <BreadCrumb href={`${config.routes.VALIDATORS.HOME}/${address}`}>
        {longStringShorten(address, 4)}
      </BreadCrumb>
    </BreadCrumbsContainer>
  );
};

const Validator = () => {
  const defaultPerformance = '24hours';
  const [svgFalg, setSvgFlag] = useState(false);
  const params: Record<string, any> = useParams();
  const defaultValidator: Record<string, any> = {};
  const [notFound, setNotFound] = useState(false);
  const [validator, setValidator] = useState(defaultValidator);
  const [loadingValidator, setLoadingValidator] = useState(false);
  const performanceStore: PerformanceStore = BaseStore.getInstance().getStore('Performance');

  /**
   * Fetch one operator by it's address
   * @param address
   * @param load_performances
   */
  const loadValidator = (address: string, load_performances: string[] | null = null) => {
    setLoadingValidator(!load_performances);
    const loadingPerformancePeriods = load_performances ?? [defaultPerformance];
    return DvfNetwork.getInstance().fetchValidator(address, loadingPerformancePeriods).then((result: any) => {
      if (result.status === 404) {
        setNotFound(true);
      } else {
        setValidator(result.data);
        setLoadingValidator(!load_performances);

        // Save all all_performances
        for (let i = 0; i < loadingPerformancePeriods.length; i += 1) {
          const performance = loadingPerformancePeriods[i];
          for (let j = 0; j < result.data.operators.length; j += 1) {
            const operator = result.data.operators[j];
            performanceStore.setValidatorOperatorPerformance(
              result.data.public_key,
              performance,
              operator.address,
              operator.performances[performance],
            );
          }
        }
      setSvgFlag(true);
      }
    });
  };

  useEffect(() => {
    if (!validator?.public_key && !loadingValidator) {
      loadValidator(params.address);
    }
  });

  const operatorStatus = (id: string | number) => {
    if (!validator) return '#inactive';
    // eslint-disable-next-line no-restricted-syntax
    for (const op of validator.lastDuty.operators) {
      if (op.address === validator.operators[id].address) {
        return '#active';
      }
    }
    return '#inactive';
  }

  const svgRef = useRef();
  const q = gsap.utils.selector(svgRef);
  const fresh = () => {
    gsap.timeline()
    // Ground
    .from(q('#svg_1'), {
      scaleY: 0,
      scaleX: 0,
      transformOrigin: 'center',
      ease: Bounce.easeOut,
      duration: 1,
    })
    .from(
      [
        q('svg > g > svg > text:nth-child(2)'),
        q('svg > g > svg > text:nth-child(3)'),
        q('svg > g > svg > text:nth-child(4)'),
      ],
      {
        scaleY: 0,
        scaleX: 0,
        transformOrigin: 'center',
        ease: Circ.easeOut,
        duration: 1,
      },
    )
    .fromTo(
      q('#svg_76'),
      { drawSVG: '0%' },
      { duration: 0.5, drawSVG: '-100%' },
      '-=1',
    )
    .fromTo(
      q('#svg_59'),
      { drawSVG: '40% 40%' },
      { duration: 0.6, drawSVG: '100%' },
      '-=0.6',
    )
    .from(
      [q('svg > g > g:nth-child(4) > text'), q('svg > g > g:nth-child(4) > use')],
      {
        scaleY: 0,
        scaleX: 0,
        transformOrigin: 'center',
        ease: Circ.easeOut,
        duration: 0.6,
      },
      '-=0.6',
    )
    .fromTo(
      q('#svg_78'),
      { drawSVG: '0%' },
      { duration: 0.8, drawSVG: '-100%' },
      '-=0.6',
    )
    .fromTo(
      q('#svg_42'),
      { drawSVG: '50% 50%' },
      { duration: 0.6, drawSVG: '100%' },
      '-=0.6',
    )
    .from(
      [q('svg > g > g:nth-child(3) > text'), q('svg > g > g:nth-child(3) > use')],
      {
        scaleY: 0,
        scaleX: 0,
        transformOrigin: 'center',
        ease: Circ.easeOut,
        duration: 0.6,
      },
      '-=0.6',
    )
    .fromTo(
      q('#svg_114'),
      { drawSVG: '0%' },
      { duration: 0.8, drawSVG: '-100%' },
      '-=0.6',
    )
    .fromTo(
      q('#svg_97'),
      { drawSVG: '60% 60%' },
      { duration: 0.6, drawSVG: '100%' },
      '-=0.6',
    )
    .from(
      [q('svg > g > g:nth-child(8) > text'), q('svg > g > g:nth-child(8) > use')],
      {
        scaleY: 0,
        scaleX: 0,
        transformOrigin: 'center',
        ease: Circ.easeOut,
        duration: 0.6,
      },
      '-=0.6',
    )
    .fromTo(
      q('#svg_77'),
      { drawSVG: '0%' },
      { duration: 0.5, drawSVG: '-100%' },
      '-=0.6',
    )
    .fromTo(
      q('#svg_2'),
      { drawSVG: '65% 65%' },
      { duration: 0.6, drawSVG: '100%' },
      '-=0.6',
    )
    .from(
      [q('svg > g > g:nth-child(2) > text'), q('svg > g > g:nth-child(2) > use')],
      {
        scaleY: 0,
        scaleX: 0,
        transformOrigin: 'center',
        ease: Circ.easeOut,
        duration: 0.6,
      },
      '-=0.6',
    )
    .repeat(-1)
    .repeatDelay(10);
  }
  useEffect(() => {
    if (!svgFalg || !validator.lastDuty) {
      return;
    }
    fresh();
    const timer = setInterval(() => {
      // fresh();
      loadValidator(params.address);
    }, 20000)
    return () => {
      clearInterval(timer)
    }
  },
   [svgFalg])

  return (
    <Layout>
      <ContentContainer>
        <EmptyPlaceholder height={10} />

        <NotFoundScreen notFound={notFound}>
          {/* <Banner /> */}
          <BreadCrumbs address={params.address} />
          <EmptyPlaceholder height={20} />

          <Grid container alignContent="center" alignItems="center">
            <Grid item xs={12} md={8}>
              <Grid container spacing={1} style={{ alignItems: 'center', marginTop: 22 }}>
                <Grid item>
                  <StatsBlock>
                    <Heading variant="h1" style={{ padding: 0, marginBottom: 6 }}>
                      Validator
                    </Heading>
                  </StatsBlock>
                </Grid>
                <Grid item>
                  <Status big status={validator.status} />
                </Grid>
              </Grid>
              {!notFound && (
                <Grid container style={{ alignItems: 'center' }}>
                  <Grid item>
                    <Typography component={'div'} noWrap>
                      {longStringShorten(params.address, 4)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <CopyToClipboardIcon data={params.address} style={{ marginLeft: 15, width: 22, height: 22 }} />
                    <BeaconchaLink height={22} width={22} address={`validator/${params.address}`} />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>

          <EmptyPlaceholder height={20} />

          <Grid container alignContent="center" alignItems="center">
            <div>
              {svgFalg && validator.lastDuty ? (
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1000" height="500" xmlSpace="preserve" version="1.1" ref={svgRef}>
                  <defs>
                    <g id="active">
                      <rect xmlns="http://www.w3.org/2000/svg" strokeWidth="0" height="26" width="72" y="0" x="-4" fill="#06b64f1f"></rect>
                      <text xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" textAnchor="start" fontFamily="Noto Sans JP" fontSize="12" strokeWidth="0" y="19" x="3" fill="#06b64f">SUCCESS</text>
                    </g>
                    <g id="inactive">
                      <rect xmlns="http://www.w3.org/2000/svg" strokeWidth="0" height="26" width="68" y="0" x="-2" fill="#ec1c261f" />
                      <text xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" textAnchor="start" fontFamily="Noto Sans JP" fontSize="12" strokeWidth="0" y="19" x="8" fill="#ec1c26">FAILURE</text>
                    </g>
                  </defs>
                  <g>
                    <svg xmlns="http://www.w3.org/2000/svg" height="510" width="510">
                      <circle xmlns="http://www.w3.org/2000/svg" id="svg_1" fill="#3F3ACA" r="127.5" cy="228" cx="268.7" className="st0">
                      </circle>
                      <text xmlns="http://www.w3.org/2000/svg" fill="white" x="50%" y="35%" dominantBaseline="central" textAnchor="middle">TIME: { validator.lastDuty.time } ms</text>

                      <text xmlns="http://www.w3.org/2000/svg" fill="white" x="50%" y="45%" dominantBaseline="central" textAnchor="middle">EPOCH: { validator.lastDuty.epoch }</text>
                      <text xmlns="http://www.w3.org/2000/svg" fill="white" x="50%" y="55%" dominantBaseline="central" textAnchor="middle">SLOT: { validator.lastDuty.slot }</text>
                    </svg>
                    <g>
                      <circle xmlns="http://www.w3.org/2000/svg" id="svg_2" strokeMiterlimit="10" strokeWidth="2" stroke="#3F3ACA" fill="none" r="65" cy="404.5" cx="491.8" className="st1" />
                      <text xmlns="http://www.w3.org/2000/svg" x="491" y="404.5" alignmentBaseline="middle" textAnchor="middle" fill="#3F3ACA">{ validator.operators[3].name }</text>
                      <use xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={operatorStatus(3)} x="460" y="414.5" />
                    </g>

                    <g>
                      <circle xmlns="http://www.w3.org/2000/svg" id="svg_42" strokeMiterlimit="10" strokeWidth="2" stroke="#3F3ACA" fill="none" r="65" cy="230.5" cx="810.5" className="st1" />
                      <text xmlns="http://www.w3.org/2000/svg" x="810.5" y="230.5" alignmentBaseline="middle" textAnchor="middle" fill="#3F3ACA">{ validator.operators[1].name }</text>
                      <use xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={operatorStatus(1)} x="780" y="240.5" />
                    </g>

                    <g xmlns="http://www.w3.org/2000/svg">
                      <circle xmlns="http://www.w3.org/2000/svg" id="svg_59" strokeMiterlimit="10" strokeWidth="2" stroke="#3F3ACA" fill="none" r="65" cy="100.5" cx="555.8" className="st1" />

                      <text xmlns="http://www.w3.org/2000/svg" x="555.8" y="100.5" alignmentBaseline="middle" textAnchor="middle" fill="#3F3ACA">{ validator.operators[0].name }</text>
                      <use xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={operatorStatus(0)} x="525" y="110" />

                    </g>

                    <line id="svg_76" strokeMiterlimit="10" strokeWidth="2" stroke="#3F3ACA" fill="none" y2="183.4" x2="388.2" y1="131" x1="498.3" className="st1" />
                    <line id="svg_77" strokeMiterlimit="10" strokeWidth="2" stroke="#3F3ACA" fill="none" y2="315.5" x2="361.5" y1="368.6" x1="438" className="st1" />
                    <line stroke="#3F3ACA" id="svg_78" strokeMiterlimit="10" strokeWidth="2" fill="none" y2="230.5" x2="396.2" y1="230.5" x1="746" className="st1" />
                    <g>
                      <circle xmlns="http://www.w3.org/2000/svg" id="svg_97" strokeMiterlimit="10" strokeWidth="2" stroke="#3F3ACA" fill="none" r="65" cy="430.5" cx="731.8" className="st1" />
                      <text xmlns="http://www.w3.org/2000/svg" x="731.8" y="430.5" alignmentBaseline="middle" textAnchor="middle" fill="#3F3ACA">{ validator.operators[2].name }</text>
                      <use xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={operatorStatus(2)} x="701" y="440.5" />
                    </g>

                    <line stroke="#3F3ACA" id="svg_114" strokeMiterlimit="10" strokeWidth="2" fill="none" y2="264.39998" x2="391" y1="402" x1="672" className="st1" />
                  </g>
                </svg>
              ) : <></>}
            </div>
          </Grid>

          <EmptyPlaceholder height={20} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <ValidatorOperators
                validator={validator}
                defaultPerformance={defaultPerformance}
                onLoadPerformances={(perf: string[], callback: any = null) => {
                  loadValidator(params.address, perf).then(() => {
                    callback && callback();
                  });
                }}
              />
              {/* <Incentivized validator={params.address} /> */}
            </Grid>
            <ValidatorDuties validator={validator} />
          </Grid>
        </NotFoundScreen>
      </ContentContainer>
    </Layout>
  );
};
export default observer(Validator);
