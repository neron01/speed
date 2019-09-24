import { DateUtils } from '~/services/DateUtils.ts'

async function loadTeamData(
  startDate: string,
  endDate: string,
  team: string,
  $axios: any
) {
  const PRIVATE_TOKEN = `_sYbMvzTEMiso2ctkByb`
  let data
  try {
    data = await $axios.$get(
      `https://gitlab.lmru.adeo.com/api/v4/merge_requests?state=merged&scope=all` +
        `&created_after=${startDate}&created_before=${endDate}&target_branch=${team}` +
        `&private_token=${PRIVATE_TOKEN}`
    )
  } catch (e) {
    return {
      mrs: [],
      name: '',
      sum: ''
    }
  }
  let sum: number = 0
  const mrs = []
  for (const d of data) {
    const resp = await $axios.$get(
      `https://gitlab.lmru.adeo.com/api/v4/projects/234/merge_requests/${d.iid}` +
        `?private_token=${PRIVATE_TOKEN}`
    )
    const resp2 = await $axios.$get(
      `https://gitlab.lmru.adeo.com/api/v4/projects/234/merge_requests/${d.iid}` +
        `/discussions?private_token=${PRIVATE_TOKEN}`
    )
    let workingMinutes = DateUtils.workingMinutesBetweenDates(
      new Date(d.created_at),
      new Date(d.updated_at)
    )
    sum += workingMinutes
    let measure = 'минут'
    if (workingMinutes > 540) {
      workingMinutes = workingMinutes / 60 / 9
      measure = 'рабочих дней'
    } else if (workingMinutes > 60) {
      workingMinutes = workingMinutes / 60
      measure = 'часов'
    }
    let disc = 0
    resp2.forEach((r: any) => {
      r.notes.forEach((note: any) => {
        if (note.resolvable) {
          disc++
        }
      })
    })

    mrs.push({
      measure,
      assignee: resp.author.name,
      changes: resp.changes_count,
      changesCount: d.changes_count,
      discussion: disc,
      iid: d.iid,
      time: (workingMinutes + '').slice(0, 3)
    })
  }
  const sumText = (sum / data.length / 60 + '').slice(0, 3)
  return {
    mrs,
    name: team,
    sum: sumText
  }
}

export default {
  async asyncData({ $axios }: any) {
    const startDate = '2018-09-01'
    const endDate = '2018-09-30'
    // const startDate = '2018-10-01';
    // const endDate = '2018-10-30';
    const teams = []
    teams.push(await loadTeamData(startDate, endDate, 'fteam_account', $axios))
    // teams.push(await loadTeamData(startDate, endDate, 'develop', app));
    const members: any[] = []
    teams.forEach((t: any) => {
      t.mrs.forEach((mr: any) => {
        const member = members.find((m: any) => {
          return m.name === mr.assignee
        })
        if (member === undefined) {
          members.push({
            count: Number(mr.changes),
            discussion: mr.discussion,
            name: mr.assignee
          })
        } else {
          member.count = member.count + Number(mr.changes)
          member.discussion = member.discussion + Number(mr.discussion)
        }
      })
    })
    return { teams, startDate, endDate, members }
  }
}
